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
                    <v-btn fab dark small color="amber lighten-1">
                      <v-icon dark>edit</v-icon>
                    </v-btn>
                    <v-btn class="ml-2" fab dark small color="amber darken-2">
                      <v-icon dark>delete</v-icon>
                    </v-btn>
                  </v-card-actions>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-card-actions class="px-0">
          <v-btn
            @click="showCreateLesson(1)"
            color="blue-grey"
            class="white--text"
          >Thêm bài học</v-btn>
          <v-btn
            @click="showCreateLesson(2)"
            color="blue-grey"
            class="white--text"
          >Thêm bài tập</v-btn>
        </v-card-actions>
      </v-container>
    </v-card>
    <div v-if="createLesson == 1">
      <CreateInteractiveLesson />
    </div>
    <div v-if="createLesson == 2">
      <CreateExercise />
    </div>
  </v-container>
</template>

<script>
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
    CourseBackground
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

<style scoped>
.v-expansion-panel-header--active {
  background-color: #FFC107;
  opacity: 1;
}
</style>
