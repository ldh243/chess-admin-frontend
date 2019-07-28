<template>
  <v-container class="pa-6">
    <v-card :elevation="8">
      <CourseBackground :title="courseDetail.name" :point="`${courseDetail.point} điểm`" />
      <v-form>
        <v-container class="pa-5" grid-list-xs>
          <v-layout wrap>
            <v-flex xs12>
              <v-textarea :value="courseDetail.description" disabled label="Mô tả: "></v-textarea>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
      <v-container class="px-5 pb-5 pt-0">
        <h5 class="mb-3 grey--text text--darken-1 title text-uppercase">Danh sách bài học</h5>
        <v-expansion-panels max="1" focusable class="mb-3">
          <v-expansion-panel v-for="(item,i) in 5" :key="i">
            <v-expansion-panel-header class="grey--text text--darken-3 font-weight-medium">Bài {{i + 1}}</v-expansion-panel-header>
            <v-expansion-panel-content align-center>
                  <v-card-actions class="px-0">
                    <p>Loại: Bài đọc</p>
                <v-spacer></v-spacer>
                    <v-btn fab dark small color="yellow darken-3">
                      <v-icon dark>edit</v-icon>
                    </v-btn>
                    <v-btn class="ml-2" fab dark small color="orange darken-3">
                      <v-icon dark>delete</v-icon>
                    </v-btn>
                  </v-card-actions>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
          <v-btn
            @click="showCreateLesson"
            color="orange darken-1"
            block
            depressed
            class="white--text"
          >Thêm mới</v-btn>
      </v-container>
    </v-card>
    <LessonTab class="mt-3" v-if="isCreateLesson"/>
  </v-container>
</template>

<script>
import LessonTab from '@/components/Instructor/LessonTab'
import CreateInteractiveLesson from '@/components/Instructor/CreateInteractiveLesson'
import CreateExercise from '@/components/Instructor/CreateExercise'
import CourseBackground from '@/components/Instructor/CourseBackground'
import Loader from '@/components/Loader'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
import { async } from 'q'
const courseRepository = RepositoryFactory.get('course')
export default {
  components: {
    CreateInteractiveLesson,
    Loader,
    CreateExercise,
    CourseBackground,
    LessonTab
  },
  data() {
    return {
      dialogLessonInteractive: false,
      loader: false,
      courseDetail: {},
      listCategorys: [],
      createLesson: '',
      isCreateLesson: false
    }
  },
  mounted() {
    this.loader = true
    this.getCourseById()
    this.loader = false
  },
  methods: {
    showCreateLesson() {
      this.isCreateLesson = true
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

<style scoped>
.v-expansion-panel-header--active {
  background: #FFD54F;
  opacity: 1 !important;
}
.v-expansion-panel-header--active::before {
  opacity: 0 !important;
}
</style>
