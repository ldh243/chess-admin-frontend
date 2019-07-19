<template>
  <v-container fluid>
    <v-card-title>
      <h2>Xét duyệt giảng viên</h2>
    </v-card-title>
    <InstructorList />
  </v-container>
</template>

<script>
import InstructorList from '@/components/RequestInstructor/InstructorList'
export default {
  components: {
    InstructorList
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
