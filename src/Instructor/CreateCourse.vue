<template>
  <div>
    <v-container>
      <h2>TẠO KHÓA HỌC MỚI</h2>
      <hr>
      <v-card>
        <v-card-text>
          <v-text-field v-model="createdCourse.name" box label="Tên khóa học" value></v-text-field>
        </v-card-text>

        <div>
          <v-card-text>
            <v-textarea v-model="createdCourse.description" box label="Mô tả: " value></v-textarea>
            <v-divider class="my-2"></v-divider>
          </v-card-text>
        </div>
        <div class="divvv">
          <div class="div">
            <v-card-text>
              <v-text-field v-model="createdCourse.point" box label="Điểm để học" value></v-text-field>
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
            <div>
              <input type="file" v-on:change="onImageChange" class="form-control">
            </div>
            <div v-if="image">
              <img :src="image" height="150" width="150">
            </div>
            <!-- <div class="col-md-3">
              <button class="btn btn-success btn-block" @click="createdCourse.image">Upload Image</button>
            </div>-->
          </v-card-actions>
          <v-divider class="my-2"></v-divider>
          <v-card-actions>
            <v-btn
              @click="showCreateLesson(1)"
              block
              color="blue-grey"
              class="white--text"
            >Thêm câu hỏi</v-btn>
            <v-btn
              @click="showCreateLesson(2)"
              block
              color="blue-grey"
              class="white--text"
            >Thêm bài tập</v-btn>
          </v-card-actions>
          <v-divider class="my-2"></v-divider>
          <v-card-actions>
            <div class="create">
              <v-btn @click="createCourse()" class="text-xs-center" color="success">Hoàn tất</v-btn>
            </div>
          </v-card-actions>
        </div>
      </v-card>
      <div v-if="createLesson == 2">
        <v-card-text>
          <CreateInteractiveLesson/>
        </v-card-text>
      </div>
    </v-container>
    <Loader v-if="loader"/>
  </div>
</template>

<script>
import CreateInteractiveLesson from '@/Instructor/CreateInteractiveLesson'
import Loader from '@/components/Loader'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
import { async } from 'q'
const categoryRepository = RepositoryFactory.get('category')
const courseRepository = RepositoryFactory.get('course')
export default {
  components: {
    CreateInteractiveLesson,
    Loader
  },
  data() {
    return {
      loader: false,
      image: '',
      createdCourse: {
        listCategoryIds: []
      },
      listCategories: [],
      createLesson: ''
    }
  },
  mounted() {
    this.loader = true
    this.getCategories()
    this.loader = false
  },
  methods: {
    showCreateLesson(number) {
      this.createLesson = number
    },
    onImageChange(e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.createImage(files[0])
    },
    createImage(file) {
      let reader = new FileReader()
      let vm = this
      reader.onload = e => {
        vm.image = e.target.result
      }
      reader.readAsDataURL(file)
    },
    async getCategories() {
      const { data } = await categoryRepository.getCategories()
      this.listCategories = data.data
    },
    async createCourse() {
      const { data } = await courseRepository.createCourse(
        this.createdCourse.name,
        this.createdCourse.description,
        this.createdCourse.image,
        this.createdCourse.point,
        this.createdCourse.listCategoryIds
      )
    }
  }
}
</script>

<style>
.div {
  width: 50%;
  float: left;
}
.divv {
  float: right;
}
.divvv {
  height: 150px;
}
.create {
  text-align: center;
}
.div1 {
  text-align: center;
}
.div2 {
  padding-top: 50px;
}
</style>
