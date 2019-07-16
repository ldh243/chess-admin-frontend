<template>
  <div>
    <v-container>
      <h2>TẠO KHÓA HỌC MỚI</h2>
      <hr />
      <v-card>
        <v-card-text>
          <v-text-field
            v-model="createdCourse.name"
            box
            label="Tên khóa học"
            :value="valueName == createdCourse.name"
          ></v-text-field>
        </v-card-text>

        <div>
          <v-card-text>
            <v-textarea v-model="createdCourse.description" box label="Mô tả: " value></v-textarea>
            <v-divider class="my-2"></v-divider>
          </v-card-text>
        </div>
        <div class="point-category">
          <div class="point">
            <v-card-text>
              <v-text-field v-model="createdCourse.point" box label="Điểm để học"></v-text-field>
            </v-card-text>
          </div>
          <div>
            <v-card-text>
              <v-flex xs9 d-flex>
                <v-select
                  v-model="createdCourse.listCategoryIds"
                  :items="listCategories"
                  item-text="name"
                  item-value="categoryId"
                  multiple
                  chips
                  label="Danh mục"
                ></v-select>
              </v-flex>
            </v-card-text>
          </div>
        </div>
        <div>
          <v-card-actions>
            <v-text-field
              label="Chọn hình ảnh"
              @click="pickFile"
              v-model="imageName"
              prepend-icon="fa-paperclip"
            ></v-text-field>
            <input
              type="file"
              style="display: none"
              ref="image"
              accept="image/*"
              @change="onFilePicked"
            />
          </v-card-actions>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <img :src="createdCourse.image" height="200" v-if="createdCourse.image" />
          <v-spacer></v-spacer>
        </v-card-actions>
        <v-divider class="my-2"></v-divider>
        <v-card-actions>
          <div class="create">
            <router-link to="/dashboard/instructorCourse">
              <v-btn @click="createCourse(), refreshPage()" class="text-xs-center" color="success">Hoàn tất</v-btn>
            </router-link>
          </div>
        </v-card-actions>
      </v-card>
    </v-container>
    <Loader v-if="loader" />
  </div>
</template>

<script>
import CreateInteractiveLesson from '@/components/Instructor/CreateInteractiveLesson'
import Loader from '@/components/Loader'
import { mapState } from 'vuex'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
import { async } from 'q'
import { log } from 'util'
const categoryRepository = RepositoryFactory.get('category')
const courseRepository = RepositoryFactory.get('course')
export default {
  components: {
    CreateInteractiveLesson,
    Loader
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

<style>
.point {
  width: 50%;
  float: left;
}
.point-category {
  height: 150px;
}
.create {
  text-align: center;
}
</style>
