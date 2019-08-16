<template>
  <v-container class="pa-6">
    <v-card elevation="8">
      <CourseBackground :title="'Tạo khóa học mới'" />
      <v-form ref="form" lazy-validation>
        <v-container class="pa-5" grid-list-xs>
          <v-layout wrap>
            <v-flex xs8>
              <v-text-field
                color="amber darken-1"
                v-model="course.name"
                label="Tên khóa học"
                :rules="nameRules"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs2>
              <v-text-field
                v-model="course.requiredPoint"
                label="Điểm để học"
                required
                color="amber darken-1"
                :rules="pointRules"
              ></v-text-field>
            </v-flex>
            <v-flex xs2>
              <v-text-field
                v-model="course.point"
                label="Điểm nhận được"
                required
                color="amber darken-1"
                :rules="pointRules"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                v-model="course.description"
                label="Mô tả: "
                value
                required
                color="amber darken-1"
                :rules="descriptionRules"
              ></v-textarea>
            </v-flex>
            <v-flex xs12>
              <v-select
                v-model="course.listCategoryIds"
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
              <v-file-input
                v-model="image"
                prepend-icon="mdi-camera"
                accept="image/png, image/jpeg"
                color="amber darken-1"
                label="Ảnh khóa học"
                :rules="imageRules"
              ></v-file-input>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
      <v-divider class="my-2"></v-divider>
      <v-card-actions class="px-5">
        <v-spacer></v-spacer>
        <v-btn depressed dark @click="resetForm" color="amber darken-2">Xóa toàn bộ</v-btn>
        <v-btn @click="createCourse" depressed dark color="amber darken-4">Hoàn tất</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import CourseBackground from '@/components/courses/courseComponents/CourseBackground'
import Loader from '@/components/Loader'
import { mapState } from 'vuex'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
const categoryRepository = RepositoryFactory.get('category')
const courseRepository = RepositoryFactory.get('course')
export default {
  components: {
    Loader,
    CourseBackground
  },
  data() {
    return {
      image: [],
      valueName: '',
      email: this.$store.state.user.email,
      loader: false,
      course: {
        name: '',
        requiredPoint: 0,
        point: 0,
        description: '',
        listCategoryIds: [],
        image: ''
      },
      listCategories: [],
      imageName: '',
      imageUrl: '',
      imageFile: '',
      nameRules: [v => !!v || 'Tên khóa học không được để trống'],
      pointRules: [v => /^\d+$/.test(v) || 'Điểm phải là giá trị số'],
      descriptionRules: [v => !!v || 'Mô tả khóa học không được để trống'],
      imageRules: [v => v.type === 'image/png' || v.type === 'image/jpeg' || 'Hình ảnh không hợp lệ']
    }
  },
  mounted() {
    this.loader = true
    this.getCategories()
    this.loader = false
  },
  computed: {},
  methods: {
    resetForm() {
      this.$refs.form.reset()
      this.$refs.form.resetValidation()
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
      if (this.$refs.form.validate()) {
        let match = this.$store.state.user.email.match(/^([^@]*)/)
        let courseSlug = this.course.name.toLowerCase().split(" ").join('-')
        this.course.image = await this.uploadImageByFile(this.image, courseSlug, `courses/${match[0]}`)
        const {data} = await courseRepository.createCourse(this.course)
      }
    }
  }
}
</script>

<style scoped>
</style>
