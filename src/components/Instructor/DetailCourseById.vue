<template>
  <div>
    <v-container>
      <v-card-title class="px-0">
        <h2>CHI TIẾT KHÓA HỌC</h2>
      </v-card-title>
      <v-card>
        <v-card-text>
          <v-text-field :value="courseDetail.name" readonly box label="Tên khóa học"></v-text-field>
        </v-card-text>

        <v-card-text>
          <v-textarea :value="courseDetail.description" readonly box label="Mô tả: "></v-textarea>
          <v-divider class="my-2"></v-divider>
        </v-card-text>

        <v-card-text>
          <v-text-field :value="courseDetail.point" readonly box label="Điểm để học"></v-text-field>
        </v-card-text>
        <v-card-text>
          <v-alert
            :value="true"
            color="success"
            outline
          >Số lượng bài học hiện có: {{courseDetail.totalLesson}}</v-alert>
          <LessonViewModels :lessonView="courseDetail.lessonViewModels" />
        </v-card-text>
        <v-card-actions>
          <v-btn @click="dialog = !dialog" block color="blue-grey" class="white--text">Thêm bài học</v-btn>
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
      </v-card>
      <div v-if="createLesson == 1">
        <CreateInteractiveLesson />
      </div>
      <div v-if="createLesson == 2">
        <CreateExercise />
      </div>
    </v-container>

    <!-- Dialog Create Lesson -->
    <v-dialog persistent v-model="dialog" max-width="500px">
      <v-card>
        <v-toolbar light color="yellow lighten-1">
          <v-toolbar-title class="fontWord">THÊM BÀI HỌC</v-toolbar-title>
        </v-toolbar>

        <v-card-text>
          <v-container grid-list-md>
            <v-flex>
              <v-card-actions>
                <v-btn class="fontWordBtn" light block color="primary" round>Thêm bài học lý thuyết</v-btn>
              </v-card-actions>
            </v-flex>
            <v-flex>
              <v-card-actions>
                <v-btn
                  @click="showCreateLesson(1), dialog = false"
                  class="fontWordBtn"
                  block
                  color="primary"
                  round
                >Thêm bài học thực hành</v-btn>
              </v-card-actions>
            </v-flex>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false" color="blue darken-1" flat>Hủy</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <Loader v-if="loader" />
  </div>
</template>

<script>
import LessonViewModels from '@/components/Instructor/LessonViewModels'
import CreateInteractiveLesson from '@/components/Instructor/CreateInteractiveLesson'
import CreateExercise from '@/components/Instructor/CreateExercise'
import Loader from '@/components/Loader'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
import { async } from 'q'
const courseRepository = RepositoryFactory.get('course')
export default {
  components: {
    LessonViewModels,
    CreateInteractiveLesson,
    Loader,
    CreateExercise
  },
  data() {
    return {
      dialog: false,
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
      if (this.courseDetail.lessonViewModels != null) {
        this.getLessonType()
      }
    },
    getLessonType() {
      this.courseDetail.lessonViewModels.forEach(element => {
        element.lessonTypeName = this.getLessonTypeName(element.lessonType)
      })
    }
  }
}
</script>

<style>
.create {
  text-align: center;
}
.fontWord {
  font-family: Comic Sans MS;
}
.fontWordBtn {
  font-family: Tahoma;
}
</style>
