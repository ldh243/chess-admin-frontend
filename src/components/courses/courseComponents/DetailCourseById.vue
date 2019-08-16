<template>
  <v-container class="pa-6">
    <v-card :elevation="8">
      <CourseBackground
        :title="course.name"
        :point="course.point"
        :requiredPoint="course.requiredPoint"
        :statusId="course.statusId"
      />
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
                <v-btn
                  @click="previewLesson(item.lessonId, item.lessonType)"
                  fab
                  dark
                  small
                  color="orange darken-3"
                >
                  <v-icon dark>play_arrow</v-icon>
                </v-btn>
                <v-btn
                  v-if="$store.state.user.roleId == 1"
                  @click="showEditingLesson(item)"
                  class="ml-2"
                  fab
                  dark
                  small
                  color="yellow darken-3"
                >
                  <v-icon dark>edit</v-icon>
                </v-btn>
                <v-btn
                  @click="confirmRemove = true; currentLessonId = item.lessonId"
                  class="ml-2"
                  fab
                  dark
                  small
                  color="orange darken-3"
                  v-if="$store.state.user.roleId == 1"
                >
                  <v-icon dark>delete</v-icon>
                </v-btn>
              </v-card-actions>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-layout
          v-if="$store.state.user.roleId == 1"
          wrap
          class="btn-add-lesson-group justify-space-between"
        >
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
        <v-btn fixed bottom right style="top:50%" @click="actionSheet = true" dark fab color="pink">
          <v-icon>settings</v-icon>
        </v-btn>
        <v-bottom-sheet v-model="actionSheet" inset :retain-focus="false">
          <v-sheet class="text-center pt-6" height="200px" >
            <div class="mt-6 title">Thay đổi trạng thái khóa học</div>
            <v-card-actions>
              <v-spacer></v-spacer>
              <div v-if="$store.state.user.roleId == 3">
                <v-btn depressed dark v-if="course.statusId == 4" color="error" @click="rejectCourse">Từ chối</v-btn>
                <v-btn depressed dark v-if="course.statusId == 4" color="success" @click="publishCourseByAdmin">Đồng ý</v-btn>
                <v-btn depressed v-if="course.statusId != 4 && course.statusId != 2" @click="publishCourseByAdmin" dark color="green">Công khai</v-btn>
                <v-btn depressed v-if="course.statusId != 4 && course.statusId != 5" @click="rejectCourse" dark color="red darken-3">Ngưng công khai</v-btn>
              </div>
              <div v-if="$store.state.user.roleId == 1">
                <v-btn depressed v-if="course.statusId != 2 && course.statusId == 1" @click="publishCourse" dark color="green">Công khai</v-btn>
                <v-btn depressed v-if="course.statusId != 5 && course.statusId == 2" @click="draftCourseStatus" dark color="red darken-3">Ngưng công khai</v-btn>
                <v-btn depressed v-if="course.statusId == 4" @click="draftCourseStatus" dark color="yellow darken-4">Soạn thảo</v-btn>
              </div>
              <div v-if="$store.state.user.roleId == 1">
                <v-card-text>Chỉ chủ khóa học mới thay đổi trạng thái khóa học</v-card-text>
              </div>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-sheet>
        </v-bottom-sheet>
      </v-container>
    </v-card>
    <v-dialog
      v-model="addLessonDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-toolbar dark color="amber darken-2">
        <v-btn icon dark @click="addLessonDialog = false;lessonType = 0;editingLessonId = 0">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>{{lessonTypeName[lessonType - 1]}}</v-toolbar-title>
      </v-toolbar>
      <v-container fluid style="background-color:#fff;height:100%">
        <Exercise v-if="addLessonDialog === true && lessonType === 1" />
        <InteractiveLesson
        :editingLessonId="editingLessonId"
          @onAddInteractiveLesson="addInteractiveLesson"
          @onUpdateInteractiveLesson="editInteractiveLesson"
          v-if="addLessonDialog === true && lessonType === 2"
        />
        <UninteractiveLesson
          :editingLessonId="editingLessonId"
          @onEditUninteractiveLesson="editUninteractiveLesson"
          @onAddUninteractiveLesson="addUninteractiveLesson"
          v-if="addLessonDialog === true && lessonType === 3"
        />
      </v-container>
    </v-dialog>
    <v-dialog
      v-model="previewLessonDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-toolbar dark color="amber darken-2">
        <v-btn icon dark @click="previewLessonDialog = false;lessonType = 0;">
          <v-icon>close</v-icon>
        </v-btn>
        <v-card-title>{{previewLessonObj.name}}</v-card-title>
      </v-toolbar>
      <v-container fluid style="background-color:#fff;height:100%">
        <PreviewExercise v-if="previewLessonDialog === true && lessonType === 1" />
        <PreviewInteractiveLesson
          :steps="previewLessonObj.interactiveLesson.steps"
          :initFen="previewLessonObj.interactiveLesson.initCode"
          v-if="previewLessonDialog === true && lessonType === 2"
        />
        <PreviewUninteractiveLesson
          :content="previewLessonObj.uninteractiveLesson.content"
          v-if="previewLessonDialog === true && lessonType === 3"
        />
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
import InteractiveLesson from '@/components/lessons/InteractiveLesson'
import Exercise from '@/components/lessons/Exercise'
import UninteractiveLesson from '@/components/lessons/UninteractiveLesson'
import PreviewExercise from '@/components/lessons/preview/PreviewExercise'
import PreviewInteractiveLesson from '@/components/lessons/preview/PreviewInteractiveLesson'
import PreviewUninteractiveLesson from '@/components/lessons/preview/PreviewUninteractiveLesson'
import CourseBackground from './CourseBackground'
import Loader from '@/components/Loader'
import CustomButton from '@/components/kit/CustomButton'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
import Chessboard from '@/components/plugins/cols-chessboard'
import Swal from 'sweetalert2'
const courseRepository = RepositoryFactory.get('course')
const lessonRepository = RepositoryFactory.get('lesson')
export default {
  components: {
    InteractiveLesson,
    Exercise,
    UninteractiveLesson,
    PreviewExercise,
    PreviewInteractiveLesson,
    PreviewUninteractiveLesson,
    Loader,
    CourseBackground,
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
      isEditingLesson: 0,
      listLessons: [],
      lessonTypeName: ['Bài thực hành', 'Trận đấu', 'Bài đọc'],
      courseId: 0,
      snackbar: false,
      snackbarContent: '',
      currentLessonTypeTab: -1,
      editingUninteractiveLessonId: 0,
      editInteractiveLessonId: 0,
      editingLessonId: 0,
      currentLessonId: -1,
      confirmRemove: false,
      lessonListPanel: -1,
      addLessonDialog: false,
      previewLessonDialog: false,
      lessonType: 0,
      previewLessonObj: {},
      actionSheet: false
    }
  },
  mounted() {
    this.loader = true
    this.courseId = this.$route.params.courseId
    this.getCourseById()
    this.loader = false
    console.log(this.$store.state.user)
  },
  methods: {
    showCreatingExercise() {
      this.addLessonDialog = true
    },
    showCreateLesson() {
      this.isCreatingLesson = true
      this.currentLessonTypeTab = 0
      this.isEditingLesson = 0
    },
    showEditingLesson(lesson) {
      this.lessonType = lesson.lessonType
      // switch (lesson.lessonType) {
      //   case 1:
      //   case 2:
      //   case 3:
      //     this.editingUninteractiveLessonId = lesson.lessonId
      //     this.addLessonDialog = true
      // }
      this.editingLessonId = lesson.lessonId
      this.addLessonDialog = true
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
      console.log(this.course)
      this.listCategorys = data.data.listCategorys
      this.listLessons = data.data.lessonViewModels
    },
    async addInteractiveLesson(course) {
      let newCourse = course
      let courseId = this.$route.params.courseId
      newCourse['courseId'] = courseId
      const data = await lessonRepository
        .createInteractiveLesson(newCourse)
        .then(async res => {
          if (res.status === 200) {
            const lesson = await courseRepository
              .getById(courseId)
              .then(res => {
                console.log(res)
                if (res.status === 200) {
                  this.course = res.data.data
                  this.listLessons = res.data.data.lessonViewModels
                  this.addLessonDialog = false
                  this.snackbarContent = 'Thêm bài học thành công'
                  this.snackbar = true
                  this.isEditingLesson = 2
                  this.lessonListPanel = this.listLessons.length - 1
                  this.lessonType = 0
                }
              })
          }
        })
    },
    async addUninteractiveLesson(course) {
      let newCourse = course
      let courseId = this.$route.params.courseId
      newCourse['courseId'] = courseId
      const data = await lessonRepository
        .createUninteractiveLesson(newCourse)
        .then(async res => {
          if (res.status === 200) {
            const lesson = await courseRepository
              .getById(courseId)
              .then(res => {
                if (res.status === 200) {
                  this.course = res.data.data
                  this.listLessons = res.data.data.lessonViewModels
                  this.snackbarContent = 'Thêm bài học thành công'
                  this.snackbar = true
                  this.addLessonDialog = false
                  this.isEditingLesson = 3
                  this.lessonListPanel = this.listLessons.length - 1
                  this.lessonType = 0
                }
              })
          }
        })
    },
    async editUninteractiveLesson(lesson) {
      //only get lesson infor from component and add lessonId in here
      lesson['lessonId'] = this.editingLessonId
      const data = await lessonRepository
        .updateUninteractiveLesson(lesson)
        .then(res => {
          if (res.status === 200) {
            this.getCourseById()
            this.addLessonDialog = false
            this.snackbarContent = 'Sửa bài học thành công'
            this.snackbar = true
            this.lessonType = 0
            this.editingLessonId = 0
          }
        })
    },
    async editInteractiveLesson(lesson) {
      lesson['lessonId'] = this.editingLessonId
      console.log(lesson)
      const data = await lessonRepository
        .updateInteractiveLesson(lesson)
        .then(res => {
          if (res.status === 200) {
            this.getCourseById()
            this.addLessonDialog = false
            this.snackbarContent = 'Sửa bài học thành công'
            this.snackbar = true
            this.lessonType = 0
            this.editingLessonId = 0
          }
        })
    },
    openLessonDialog(lessonType) {
      this.editingUninteractiveLessonId = 0
      this.addLessonDialog = true
      this.lessonType = lessonType
    },
    async previewLesson(lessonId, lessonType) {
      this.lessonType = lessonType
      const { data } = await lessonRepository.getById(lessonId).then(res => {
        this.previewLessonDialog = true
        this.previewLessonObj = res.data.data
      })
    },
    async publishCourse() {
      const courseId = this.$route.params.courseId
      const data  = await courseRepository.publishCourse(courseId).then(res => {
        if (res.status === 200) {
          this.snackbarContent = 'Khóa học đang được xét duyệt, xin vui lòng chờ.'
          this.snackbar = true
          this.actionSheet = false
          this.course.statusId = 4
          this.$forceUpdate()
        }
      })
    },
    async rejectCourse(){
      const courseId = this.$route.params.courseId
      Swal.fire({
        text: 'Nhập lí do từ chối',
        input: 'textarea',
        inputAttributes: {
          autocapitalize: 'off'
        },
        inputValidator: (value) => {
          if (!value && value.length < 6) {
            return 'Lí do phải từ 6 kí tự trở lên'
          }
        },
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        showLoaderOnConfirm: true,
        preConfirm: async(rejectMessage) => {
          await this.updateCourseStatus(courseId,5,rejectMessage,'Khóa học đã được từ chối')
        },
        allowOutsideClick: () => !Swal.isLoading()
      })
    },
    async publishCourseByAdmin(){
      const courseId = this.$route.params.courseId
      await this.updateCourseStatus(courseId,2,'','Khóa học đã được công khai')
    },
    async updateCourseStatus(courseId,statusId,rejectMessage,onSuccessMessage){
        const data  = await courseRepository.updateCourseStatus(courseId,rejectMessage,statusId).then(res => {
          if (res.status === 200) {
            this.snackbarContent = onSuccessMessage 
            this.snackbar = true
            this.course.statusId = statusId
            this.actionSheet = false
            this.$forceUpdate()
          }
        })
    },
    async draftCourseStatus(){
      Swal.fire({
        title: 'Cảnh báo',
        text: this.course.statusId == 4 ? "Điều này có thể khiến Admin không nhìn thấy request của bạn nữa!" 
        : "Điều này có thể khiến học viên không thể nhìn thấy khóa học này nữa!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Chấp nhận',
        cancelButtonText: 'Hủy bỏ'
      }).then(async (result) => {
        if (result.value) {
          const courseId = this.$route.params.courseId
          await courseRepository.changeStatusCourseToDrafting(courseId).then(res => {
            if (res.status === 200) {
              this.snackbarContent = 'Khóa học đã được chuyển sang trạng thái soạn thảo.'
              this.snackbar = true
              this.actionSheet = false
              this.course.statusId = 1
              this.$forceUpdate()
            }
          })
        }
      })
    },
    async approveCourse() {
      const courseId = this.$route.params.courseId
      const data  = await courseRepository.updateCourseStatus(courseId, 2).then(res => {
        if (res.status === 200) {
          this.snackbarContent = 'Khóa học đã được công khai.'
          this.snackbar = true
          this.actionSheet = false
        }
      })
    },
    async rejectCourse() {
      const courseId = this.$route.params.courseId
      const data  = await courseRepository.updateCourseStatus(courseId, 5).then(res => {
        if (res.status === 200) {
          this.snackbarContent = 'Khóa học đã bị từ chối.'
          this.snackbar = true
          this.actionSheet = false
        }
      })
    }
  }
}
</script>

<style scoped>
.v-expansion-panel-header--active {
  background: #ffe082;
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
