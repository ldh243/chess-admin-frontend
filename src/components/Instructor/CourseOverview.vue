<template>
  <div>
    <v-container>
        <v-card :elevation="8">
            <v-card-title>
            <h3 class="grey--text text--darken-2 title">Danh sách khóa học</h3>
            <!-- <v-spacer></v-spacer>
          <v-flex xs3>
            <v-text-field height="20" outlined rounded append-icon="fa-search" color="amber"></v-text-field>
          </v-flex> -->
          </v-card-title>
          <v-divider></v-divider>
          <v-layout column wrap :pagination.sync="pagination">
          <v-flex
            v-for="(item, index) in listCourses"
            :key="index"
            class="course-item"
            px-5 pt-5
          >
            <CourseItem :content="item" class="mb-3"/>
            <v-divider class="my-5 course-divider"></v-divider>
          </v-flex>
        </v-layout>
        <div class="text-xs-center pb-2 ">
          <v-layout justify-center>
            <v-pagination v-model="pagination.pages" color="amber accent-3" :length="pages" circle></v-pagination>
          </v-layout>
        </div>
        </v-card>
    </v-container>
    <Loader v-if="loader"/>
  </div>
</template>


<script>
import CourseItem from '@/components/Instructor/CourseItem'
import Loader from '@/components/Loader'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
const courseRepository = RepositoryFactory.get('course')
export default {
  components: {
    CourseItem,
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
      listCourses: [{
        courseId: 1,
        courseName: 'Cách học cờ vua',
        courseDescription: 'basic to master',
        courseImage: "https://i.ytimg.com/vi/6K_MElXH694/maxresdefault.jpg",
        courseCreatedDate: "2019-06-04T16:02:08.000+0000",
        point: -300,
        statusId: 2,
        author: {
          userId: 52,
          email: null,
          fullName: "Dang Van Hoang - K11 FUG HCM",
          roleId: 1,
          avatar: "https://lh4.googleusercontent.com/-Fo4zncGaROA/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rctOAda47D_gQ_MGmBjdjy8bgp6DA/mo/photo.jpg"
        },
      },
      {
        courseId: 2,
        courseName: "Cách chơi cờ cơ bản",
        courseDescription: "trainning",
        courseImage: "http://3.bp.blogspot.com/-opna9bBQCN0/VWf_jZDj8OI/AAAAAAAALVE/lZ8zdjKyTTE/s1600/ban%2Bco%2Bv.jpg",
        courseCreatedDate: "2019-06-04T16:02:50.000+0000",
        point: 0,
        statusId: 2,
        author: {
          userId: 53,
          email: null,
          fullName: "Chess Learning System Admin",
          roleId: 0,
          avatar: "https://lh6.googleusercontent.com/-_nkeCY8xsbQ/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcW5iOIe-Ryy4fdawUdHwY5SCXXEQ/mo/photo.jpg"
        },
      }],
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
    // this.loader = true
    // this.getCoursesPaginationCurrentInstructor()
    // this.loader = false
  },
  methods: {
    // async getCoursesPaginationCurrentInstructor() {
    //   const {
    //     data
    //   } = await courseRepository.getCoursesPaginationCurrentInstructor(1, 500)
    //   this.listCourses = this.formatListCourse(data.data.content)
    //   console.log(data)
    // },
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
.v-card {
  border-radius: 10px;
}
.course-item {
  flex-basis: 32.6666666%;
  -webkit-box-flex: 0;
  -ms-flex-positive: 0;
  flex-grow: 0;
}
.course-divider {
  border-style: dashed; 
}
</style>
