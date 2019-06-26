<template>
  <div>
    <v-container>
      <h2>TẠO KHÓA HỌC MỚI</h2>
      <hr>
      <v-card>
        <v-card-text>
          {{this.listCategory.name}}
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
                  @input="setSelected"
                  v-model="createCourse.listCategoryIds"
                  :items="listNameCategory"
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
              <img v-model="createdCourse.image" :src="image" height="150" width="150">
            </div>
          </v-card-actions>
          <v-divider class="my-2"></v-divider>
          <v-card-actions>
            <div class="create">
              <v-btn @click="createCourse()" class="text-xs-center" color="success">Hoàn tất</v-btn>
            </div>
          </v-card-actions>
          <!-- <div>
            <v-btn @click="showCreate(1)" color="blue-grey" class="white--text">Thêm câu hỏi</v-btn>
            <v-btn @click="showCreate(2)" color="blue-grey" class="white--text">Thêm bài tập</v-btn>
          </div>-->
        </div>
      </v-card>
      <div v-if="createCourse == 2">
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
      category: {},
      loader: false,
      image: '',
      name: '',
      listCategoryIds: [],
      listCategory: [],
      data: name,
      createdCourse: [],
      listNameCategory: [],
      str: ','
    }
  },
  mounted() {
    this.loader = true
    this.getCategories()
    this.loader = false
  },
  methods: {
    showCreate(number) {
      this.createCourse = number
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
    setSelected(value) {
      this.listCategoryIds = []
      // value ko co dau phay thi chay ham duoi
      var tmp = []
      if (value.includes(this.str)) {
        return (tmp = value.splice(this.str))
        console.log('aaaaaa' + tmp)
      }

      for (let i = 0; i < this.listCategory.length; i++) {
        const element = this.listCategory[i]
        //for tmp
        if (value == element.name) {
          this.listCategoryIds.push(element.categoryId)
        }
        // this.listNameCategory.push(element.name)
      }

      // neu nhu co dau phay thi goi ham split cat dau phay
      //lay ra 1 list gia tri cua bien value
      //copy vong for o tren roi them 1 vong for o trong (for cua list da cat dau phay)
      console.log(this.listCategoryIds)
      console.log('value' + value)
    },
    async getCategories() {
      const { data } = await categoryRepository.getCategories()
      console.log(data)
      this.listCategory = this.formatListCourse(data.data)
      for (let i = 0; i < this.listCategory.length; i++) {
        const listCategory = this.listCategory[i]
        this.listNameCategory.push(listCategory.name)
      }
      console.log(this.listNameCategory)
    },
    async createCourse() {
      const { data } = await courseRepository.createCourse(
        this.createdCourse.name,
        this.createdCourse.description,
        this.createdCourse.image,
        this.createdCourse.point,
        this.createdCourse.listCategoryIds
      )
      console.log(data)
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
