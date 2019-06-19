<template>
  <v-content>
    <v-container>
      <v-layout row wrap>
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
    </v-container>
    <Loader v-if="loader"/>
  </v-content>
</template>


<script>
import CourseDetail from '@/Instructor/CourseDetail'
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
      changeStatusDetail: {
        action: '',
        email: '',
        status: ''
      },
      loader: false,
      search: '',
      pagination: {
        rowsPerPage: 10
      },
      listCourses: [],
      editedCourse: {}
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
    this.getCoursesPagination()
    this.loader = false
  },
  methods: {
    async getCoursesPagination() {
      const { data } = await courseRepository.getCoursesPagination(1, 500)
      this.listCourses = this.formatListCourse(data.data.content)
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
