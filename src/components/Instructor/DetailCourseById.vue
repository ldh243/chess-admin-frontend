<template>
  <v-container class="pa-6">
    <v-card :elevation="8">
      <CourseBackground :title="course.name" :point="`${course.requiredPoint} điểm`" />
      <v-form>
        <v-container class="pa-5" grid-list-xs>
          <v-layout wrap>
            <v-flex xs12>
              <v-textarea :value="course.description" disabled label="Mô tả: "></v-textarea>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
      <v-container class="px-5 pb-5 pt-0">
        <h5 class="mb-3 grey--text text--darken-1 title text-uppercase">Danh sách bài học</h5>
        <v-alert
          border="right"
          colored-border
          type="warning"
          elevation="2"
          v-if="listLessons.length === 0"
        >Khóa học hiện tại chưa có bài học nào.</v-alert>
        <v-expansion-panels
          :value="lessonListPanel"
          max="1"
          focusable
          class="mb-3"
          v-if="listLessons.length > 0"
        >
          <v-expansion-panel v-for="(item,i) in listLessons" :key="i">
            <v-expansion-panel-header
              class="grey--text text--darken-3 font-weight-medium"
            >Bài {{i + 1}}: {{item.name}}</v-expansion-panel-header>
            <v-expansion-panel-content align-center>
              <v-card-actions class="px-0">
                <p>Loại: {{lessonTypeName[item.lessonType - 1]}}</p>
                <v-spacer></v-spacer>
                <v-btn @click="showEditingLesson(item)" fab dark small color="yellow darken-3">
                  <v-icon dark>edit</v-icon>
                </v-btn>
                <v-btn
                  @click="confirmRemove = true; currentLessonId = item.lessonId"
                  class="ml-2"
                  fab
                  dark
                  small
                  color="orange darken-3"
                >
                  <v-icon dark>delete</v-icon>
                </v-btn>
              </v-card-actions>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-layout wrap class="btn-add-lesson-group justify-space-between">
          <v-flex xs4>
            <v-card color="amber" style="border-radius:4px;">
              <a @click="openLessonDialog(1)">
                <CustomButton :name="'Thêm bài thực hành'" :icon="'fa-chess'" />
              </a>
            </v-card>
          </v-flex>
          <v-flex xs4>
            <v-card color="amber" style="border-radius:4px;">
              <a @click="openLessonDialog(2)">
                <CustomButton :name="'Thêm trận đấu'" :icon="'fa-chess-board'" />
              </a>
            </v-card>
          </v-flex>
          <v-flex xs4>
            <v-card color="amber" style="border-radius:4px;">
              <a @click="openLessonDialog(3)">
                <CustomButton :name="'Thêm bài đọc'" :icon="'fa-book-open'" />
              </a>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <v-dialog
      v-model="addLessonDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-toolbar dark color="amber darken-2">
        <v-btn icon dark @click="addLessonDialog = false">
          <v-icon class="test">close</v-icon>
        </v-btn>
        <v-toolbar-title>{{lessonTypeName[lessonType - 1]}}</v-toolbar-title>
      </v-toolbar>
      <v-container fluid style="background-color:#fff;height:100%">
        <Exercise v-if="lessonType === 1" />
        <InteractiveLesson v-if="lessonType === 2" />
        <UninteractiveLesson :editingLessonId="editingUninteractiveLessonId" @onEditUninteractiveLesson="editUninteractiveLesson" @onAddUninteractiveLesson="addUninteractiveLesson" v-if="lessonType === 3" />
      </v-container>
    </v-dialog>
    <v-snackbar v-model="snackbar" top :timeout="5000">
      {{snackbarContent}}
      <v-btn @click="snackbar = false" fab icon color="grey">
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
    <v-dialog v-model="confirmRemove" max-width="320">
      <v-card>
        <v-card-title class="headline">Xác nhận</v-card-title>
        <v-card-text>Bạn có muốn xóa bài học này?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="amber darken-1" dark text @click="confirmRemove = false">Đóng</v-btn>
          <v-btn color="amber darken-1" dark text @click="removeLesson">Xác nhận</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import LessonTab from '@/components/Instructor/LessonTab'
import InteractiveLesson from '@/components/Lessons/InteractiveLesson'
import Exercise from '@/components/Lessons/Exercise'
import UninteractiveLesson from '@/components/Lessons/UninteractiveLessonForm'
import CourseBackground from '@/components/Instructor/CourseBackground'
import Loader from '@/components/Loader'
import CustomButton from '@/components/kit/CustomButton'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
import Chessboard from '@/components/plugins/cols-chessboard'
const courseRepository = RepositoryFactory.get('course')
const lessonRepository = RepositoryFactory.get('lesson')
export default {
  components: {
    InteractiveLesson,
    Exercise,
    UninteractiveLesson,
    Loader,
    CourseBackground,
    LessonTab,
    CustomButton,
    Chessboard
  },
  data() {
    return {
      dialogLessonInteractive: false,
      loader: false,
      course: {},
      listCategorys: [],
      createLesson: '',
      isCreatingLesson: false,
      isEditingLesson: false,
      listLessons: [],
      lessonTypeName: ['Thêm bài thực hành', 'Thêm trận đấu', 'Thêm bài đọc'],
      courseId: 0,
      snackbar: false,
      snackbarContent: '',
      currentLessonTypeTab: -1,
      editingUninteractiveLessonId: 0,
      currentLessonId: -1,
      confirmRemove: false,
      lessonListPanel: -1,
      addLessonDialog: false,
      addInteractiveDialog2: false,
      lessonType: 0
    }
  },
  mounted() {
    this.loader = true
    this.courseId = this.$route.params.courseId
    this.getCourseById()
    this.loader = false
  },
  methods: {
    showCreatingExercise() {
      this.addLessonDialog = true
    },
    showCreateLesson() {
      this.isCreatingLesson = true
      this.currentLessonTypeTab = 0
      this.editingLessonId = 0
      this.isEditingLesson = 0
    },
    showEditingLesson(lesson) {
      this.lessonType = lesson.lessonType
      switch (lesson.lessonType) {
        case 1:
        case 2:
        case 3:
          this.editingUninteractiveLessonId = lesson.lessonId
          this.addLessonDialog = true
      }
    },
    async removeLesson() {
      const data = await lessonRepository
        .removeLesson(this.currentLessonId)
        .then(res => {
          if (res.status === 200) {
            this.getCourseById()
            this.confirmRemove = false
            this.lessonListPanel = []
            if (this.isEditingLesson > 0) {
              this.isEditingLesson = 0
            }
          }
        })
    },
    async getCourseById() {
      const courseId = this.$route.params.courseId
      const { data } = await courseRepository.getById(courseId)
      this.course = data.data
      this.listCategorys = data.data.listCategorys
      this.listLessons = data.data.lessonViewModels
    },
    async addUninteractiveLesson(course) {
      let newCourse = course
      newCourse['courseId'] = this.courseId
      const data = await lessonRepository
        .createUninteractiveLesson(newCourse)
        .then(res => {
          if (res.status === 200) {
            newCourse['lessonId'] = res.data.data.savedId
            newCourse['lessonOrdered'] = this.listLessons.length
            newCourse['lessonType'] = 3
            this.editingLessonId = res.data.data.savedId
            this.listLessons.push(newCourse)
            this.snackbarContent = 'Thêm bài học thành công'
            this.snackbar = true
            this.addLessonDialog = false
            this.isEditingLesson = 3
            this.editingUninteractiveLessonId = newCourse.lessonId
            this.lessonListPanel = this.listLessons.length - 1
          }
        })
    },
    async editUninteractiveLesson(lesson) {
      //only get lesson infor from component and add lessonId in here
      lesson['lessonId'] = this.editingUninteractiveLessonId
      const data = await lessonRepository
        .updateUninteractiveLesson(lesson)
        .then(res => {
          if (res.status === 200) {
            this.getCourseById()
            this.addLessonDialog = false
            this.snackbarContent = 'Sửa bài học thành công'
            this.snackbar = true
          }
        })
    },
    openLessonDialog(lessonType) {
      this.addLessonDialog = true
      this.lessonType = lessonType
    },
    
  }
}
</script>

<style scoped>
.v-expansion-panel-header--active {
  background: #FFE082;
  opacity: 1 !important;
}
.v-expansion-panel-header--active::before {
  opacity: 0 !important;
}
.v-dialog--fullscreen {
  overflow-y: hidden !important;
}
</style>
<style>
.btn-add-lesson-group .xs4 {
  max-width: 33% !important;
}
</style>
