<template>
  <v-container fluid>
    <v-layout wrap row>
      <v-flex
        v-for="(item, index) in 7"
        :key="index"
        xs6
        :class="{ 'margin-right': item % 2 === 1 ? '10px' : '' }"
      >
        <Course/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Course from '@/components/Courses/CourseCard'
export default {
  components: {
    Course
  }
}
</script>

<style scoped>
</style>
