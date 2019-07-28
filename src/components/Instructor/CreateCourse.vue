<template>
  <v-container class="pa-6">
    <v-card elevation="8">
      <CourseBackground :title="'Tạo khóa học mới'"/>
        <v-form>
          <v-container class="pa-5" grid-list-xs>
            <v-layout wrap>
            <v-flex xs9>
              <v-text-field
                color="amber darken-1"
                v-model="createdCourse.name"
                box
                label="Tên khóa học"
                :error-messages="nameErrors"
                required
              ></v-text-field>
              </v-flex>
              <v-flex xs3>
                <v-text-field
                  v-model="createdCourse.point"
                  box
                  label="Điểm để học"
                  :error-messages="pointErros"
                  required
                  color="amber darken-1"
                ></v-text-field>
              </v-flex>
            <v-flex xs12>
              <v-textarea
                v-model="createdCourse.description"
                box
                label="Mô tả: "
                value
                :error-messages="decriptonErrors"
                required
                color="amber darken-1"
              ></v-textarea>
            </v-flex>
            <v-flex xs12>
              <v-select
                v-model="createdCourse.listCategoryIds"
                :items="listCategories"
                item-text="name"
                item-value="categoryId"
                multiple
                chips
                label="Danh mục"
                color="amber darken-1"
                item-color="amber darken-1"
              ></v-select>
            </v-flex>
            <v-flex xs12>
              <v-file-input prepend-icon="mdi-camera" accept="image/*" color="amber darken-1" label="Ảnh khóa học"></v-file-input>
            </v-flex>
          </v-layout>
          </v-container>
        </v-form>
      <v-divider class="my-2"></v-divider>
      <v-card-actions class="px-5">
        <v-spacer></v-spacer>
        <v-btn depressed dark color="amber darken-2">Xóa toàn bộ</v-btn>
        <v-btn @click="createCourse()" depressed dark color="amber darken-4">Hoàn tất</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, integer } from 'vuelidate/lib/validators'
import CreateInteractiveLesson from '@/components/Instructor/CreateInteractiveLesson'
import CourseBackground from '@/components/Instructor/CourseBackground'
import Loader from '@/components/Loader'
import { mapState } from 'vuex'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
import { async } from 'q'
import { log } from 'util'
const categoryRepository = RepositoryFactory.get('category')
const courseRepository = RepositoryFactory.get('course')
export default {
  mixins: [validationMixin],
  components: {
    CreateInteractiveLesson,
    Loader,
    CourseBackground
  },
  validations: {
    createdCourse: {
      name: { required },
      description: { required },
      listCategoryIds: { required },
      image: { required },
      point: { required, integer }
    }
  },
  data() {
    return {
      valueName: '',
      email: this.$store.state.user.email,
      loader: false,
      createdCourse: {
        name: '',
        description: '',
        image: '',
        point: '',
        listCategoryIds: []
      },
      listCategories: [],
      createLesson: '',
      imageName: '',
      imageUrl: '',
      imageFile: ''
    }
  },
  mounted() {
    this.loader = true
    this.getCategories()
    this.loader = false
  },
  computed: {},
  methods: {
    refreshPage() {
      window.location.reload()
    },
    showCreateLesson(number) {
      this.createLesson = number
    },
    pickFile() {
      this.$refs.image.click()
    },
    onFilePicked(e) {
      const files = e.target.files
      if (files[0] !== undefined) {
        this.imageName = files[0].name
        if (this.imageName.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.createdCourse.image = fr.result
          this.imageFile = files[0]
        })
      } else {
        this.imageName = ''
        this.imageFile = ''
        this.createdCourse.image = ''
      }
    },
    async getCategories() {
      const { data } = await categoryRepository.getCategories()
      this.listCategories = data.data
    },
    async createCourse() {
      this.$v.createdCourse.$touch()
      let image = '',
        nameCourse = this.createdCourse.name
      let match = this.$store.state.user.email.match(/^([^@]*)/)
      image = await this.uploadImageByDataURL(
        this.createdCourse.image,
        nameCourse,
        `courses/${match[0]}`
      )
      const { data } = await courseRepository.createCourse(
        this.createdCourse.name,
        this.createdCourse.description,
        image,
        this.createdCourse.point,
        this.createdCourse.listCategoryIds
      )
      console.log(data)
    }
  }
}
</script>

<style scoped>

</style>
