<template>
  <v-container fluid>
    <v-card-title>
      <h2>Xét duyệt khóa học</h2>
    </v-card-title>
    <WaitingCourse />
  </v-container>
</template>

<script>
import WaitingCourse from '@/components/Courses/WaitingCourse'
export default {
  components: {
    WaitingCourse
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
