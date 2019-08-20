<template>
  <v-img :src="backgroundImage" height="250">
    <v-layout pa-5 column fill-height class="white--text">
      <v-spacer></v-spacer>
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
      default: 0
    },
    requiredPoint: {
      type: Number,
      default: 0
    },
    statusId: {
      type: Number,
      default: -1
    },
    backgroundImage: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      courseStatusColor: [
        'yellow darken-4',
        'green',
        'red',
        'orange darken-4',
        'red darken-3'
      ],
      courseStatusName: [
        'Đang soạn thảo',
        'Công khai',
        'Đã xóa',
        'Chờ xét duyệt',
        'Đã từ chối'
      ]
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.create-course-title {
  font-family: 'Roboto', sans-serif;
}
.v-image {
  background-color: #454545;
}
</style>
