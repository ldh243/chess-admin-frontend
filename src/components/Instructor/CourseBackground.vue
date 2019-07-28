<template>
  <v-img :src="backgroundImage" height="250">
    <v-layout pa-5 column fill-height class="white--text">
      <v-spacer></v-spacer>
      <v-flex shrink>
        <p class="mb-1 display-1 text-uppercase font-weight-medium">{{title}}</p>
        <p class="mb-0 white--text title">{{point}}</p>
      </v-flex>
    </v-layout>
  </v-img>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    point: {
        type: String,
        default: ''
    }
  },
  data() {
    return {
      backgroundImage: require('@/assets/images/chess-create-course.jpg')
    }
  }
}
</script>

<style scoped>
.create-course-title {
  font-family: 'Roboto', sans-serif;
}
</style>
