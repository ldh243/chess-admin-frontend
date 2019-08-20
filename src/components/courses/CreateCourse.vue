<template>
  <v-container class="pa-6">
    <v-btn @click="chooseUpload" text icon absolute style="z-index:100; top:230px; left:30px">
          <v-icon color="white">fa-camera</v-icon>
        </v-btn>
        <input ref="input" type="file" style="display:none;" accept="image/png, image/jpeg" @change="fileSelected" />
        <v-snackbar
      v-model="errorSnackbar" 
    > 
    <v-icon color="red">fa-exclamation-triangle</v-icon>
      {{ errorSnackbarContent }}
      <v-btn
        text
        icon
        @click="errorSnackbar = false"
      >
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
    <course-form :courseImage="courseImage"></course-form>
  </v-container>
</template>

<script>
import CourseForm from './courseComponents/CourseForm'
import Loader from '@/components/Loader'
export default {
  components: {
    CourseForm
  },
  data() {
    return {
      courseImage: null,
      errorSnackbar: false,
      errorSnackbarContent: 'Hình ảnh không đúng định dạng'
    }
  },
  methods: {
    chooseUpload() {
      this.$refs.input.click()
    },
    fileSelected(e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length || files.length === 0) {
        return
      }
      if (files[0].type !== 'image/png' && files[0].type !== 'image/jpeg') {
        this.errorSnackbar = true
        this.errorSnackbarContent = "Hình ảnh không đúng định dạng"
      } else {
        this.courseImage = files[0]
      }
    }
  }
}
</script>

<style scoped>
</style>
