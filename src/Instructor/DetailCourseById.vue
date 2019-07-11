<template>
  <div>
    <v-container>
      <h2>CHI TIẾT KHÓA HỌC</h2>
      <hr />
      <v-card>
        <v-card-text>
          <v-text-field :value="courseDetail.name" readonly box label="Tên khóa học"></v-text-field>
        </v-card-text>

        <div>
          <v-card-text>
            <v-textarea :value="courseDetail.description" readonly box label="Mô tả: "></v-textarea>
            <v-divider class="my-2"></v-divider>
          </v-card-text>
        </div>
        <div class="divvv">
          <div>
            <v-card-text>
              <v-text-field :value="courseDetail.point" readonly box label="Điểm để học"></v-text-field>
            </v-card-text>
          </div>
        </div>
        <div>
          <v-card-text>
            <v-alert
              :value="true"
              color="success"
              outline
            >Số lượng bài học hiện có: {{courseDetail.totalLesson}}</v-alert>
          </v-card-text>
          <v-card-actions>
            <v-btn
              @click="showCreateLesson(1)"
              block
              color="blue-grey"
              class="white--text"
            >Thêm bài học</v-btn>
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
          <CreateInteractiveLesson />
        </v-card-text>
      </div>
    </v-container>
    <Loader v-if="loader" />
  </div>
</template>

<script>
import CreateInteractiveLesson from '@/Instructor/CreateInteractiveLesson'
import Loader from '@/components/Loader'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
import { async } from 'q'
const courseRepository = RepositoryFactory.get('course')
export default {
  components: {
    CreateInteractiveLesson,
    Loader
  },
  data() {
    return {
      dialogLessonInteractive: false,
      loader: false,
      courseDetail: {},
      listCategorys: [],
      createLesson: ''
    }
  },
  mounted() {
    this.loader = true
    this.getCourseById()
    this.loader = false
  },
  methods: {
    showCreateLesson(number) {
      this.createLesson = number
    },
    async getCourseById() {
      const courseId = this.$route.params.courseId
      const { data } = await courseRepository.getById(courseId)
      this.courseDetail = data.data
      this.listCategorys = data.data.listCategorys
      console.log(this.courseDetail)
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
  height: 100px;
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
