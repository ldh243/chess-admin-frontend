<template>
  <v-img :src="backgroundImage" height="250">
    <v-layout pa-5 column fill-height class="white--text">
      <v-spacer></v-spacer>
      <v-flex shrink>
        <p class="mb-1 display-1 text-uppercase font-weight-medium">{{title}}</p>
        <p class="white--text title mb-0" v-show="point !== -1 || requiredPoint !== -1">Điểm:</p>
        <p class="mb-0 white--text title" v-show="point !== -1 || requiredPoint !== -1">
          <v-icon dark>fa-user-plus</v-icon> {{requiredPoint}} <v-icon dark>fa-user-minus</v-icon> {{point}}</p>
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
      type: Number,
      default: -1
    },
    requiredPoint: {
      type: Number,
      default: -1
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
