<template>
  <div>
    <v-container>
      <div>
        <v-layout row wrap :pagination.sync="pagination">
          <v-flex
            v-for="(item, index) in listCourses"
            :key="index"
            class="course-item"
            :style="{ marginRight: index % 3 != 2 ? 'calc(1%)' : '0px' }"
            mb-3
          >
            <CourseDetail :content="item"/>
          </v-flex>
        </v-layout>
        <div class="text-xs-center pt-2">
          <v-pagination v-model="pagination.pages" :length="pages" circle></v-pagination>
        </div>
      </div>
    </v-container>
    <Loader v-if="loader"/>
  </div>
</template>


<script>
import CourseDetail from '@/components/Instructor/CourseDetail'
import Loader from '@/components/Loader'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
const courseRepository = RepositoryFactory.get('course')
export default {
  components: {
    CourseDetail,
    Loader
  },
  data() {
    return {
      dialog: false,
      loader: false,
      search: '',
      pagination: {
        rowsPerPage: 4
      },
      listCourses: [],
      editedCourse: {},
      removedCourse: []
    }
  },
  computed: {
    pages() {
      const rowsPerPage = this.pagination.rowsPerPage
      const totalItems = this.listCourses.length
      if (rowsPerPage == null || totalItems == null) return 0

      return Math.ceil(totalItems / rowsPerPage)
    }
  },
  mounted() {
    this.loader = true
    this.getCoursesPaginationCurrentInstructor()
    this.loader = false
  },
  methods: {
    async getCoursesPaginationCurrentInstructor() {
      const {
        data
      } = await courseRepository.getCoursesPaginationCurrentInstructor(1, 500)
      this.listCourses = this.formatListCourse(data.data.content)
      console.log(data)
    },
    async removeCourse() {
      const { data } = await courseRepository.removeCourse(
        this.listCourses.courseId
      )
      console.log(data)
    }
  }
}
</script>

<style scoped>
.course-item {
  flex-basis: 32.6666666%;
  -webkit-box-flex: 0;
  -ms-flex-positive: 0;
  flex-grow: 0;
}
</style>
