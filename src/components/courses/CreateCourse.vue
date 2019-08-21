<template>
  <v-container class="pa-6">
    <v-card :elevation="8">
      <course-background @onBackground="getFile"></course-background>
    <course-form @createdCourse="createCourse"></course-form>
    </v-card>
  </v-container>
</template>

<script>
import CourseBackground from './courseComponents/CourseBackground'
import CourseForm from './courseComponents/CourseForm'
import {RepositoryFactory} from '@/repository/RepositoryFactory'
import Loader from '@/components/Loader'
const courseRepository = RepositoryFactory.get('course')
export default {
  components: {
    CourseForm,
    CourseBackground
  },
  data() {
    return {
      courseImage: null
    }
  },
  methods: {
    getFile(file) {
      this.courseImage = file
    },
    async createCourse(course) {
      let match = this.$store.state.user.email.match(/^([^@]*)/)
        let courseSlug = course.name.toLowerCase().split(" ").join('-')
        course.image = await this.uploadImageByFile(this.courseImage, courseSlug, `courses/${match[0]}`)
        console.log(course)
        const data = await courseRepository.createCourse(course).then(res => {
          const courseId = res.data.data.savedId
          this.$router.push({path: `/dashboard/courses/${courseId}`})
        })
    }
  }
}
</script>

<style scoped>
</style>
