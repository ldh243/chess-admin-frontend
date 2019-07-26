<template>
  <v-card :elevation="8">
    <v-toolbar flat>
      <v-icon>mdi-account</v-icon>
      <v-toolbar-title class="font-weight-light">Thành tích</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="darken-3" fab small @click="isEditing = !isEditing">
        <v-icon v-if="isEditing">mdi-close</v-icon>
        <v-icon v-else>mdi-pencil</v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text>
      <v-textarea :disabled="!isEditing" name="input-7-1" label="Giải thưởng" auto-grow></v-textarea>
    </v-card-text>
    <v-card-actions>
      <!-- <div class="centerx">
        <vs-upload
          multiple
          text="Upload Multiple"
          action="https://jsonplaceholder.typicode.com/posts/"
          @on-success="successUpload"
        />
      </div>-->
      <v-spacer></v-spacer>
      <v-btn :disabled="!isEditing" color="success" @click="save">Lưu</v-btn>
    </v-card-actions>
    <v-snackbar v-model="hasSaved" :timeout="2000" absolute bottom left>Thông tin đã được cập nhật</v-snackbar>
  </v-card>
</template>

<script>
// import UploadButton from 'vuetify-upload-button'
export default {
  components: {
    // 'upload-btn': UploadButton
  },
  data() {
    return {
      hasSaved: false,
      isEditing: null
    }
  },
  methods: {
    save() {
      this.isEditing = !this.isEditing
      this.hasSaved = true
    },
    successUpload() {
      this.$vs.notify({
        color: 'success',
        title: 'Upload Success',
        text: 'Lorem ipsum dolor sit amet, consectetur'
      })
    }
  }
}
</script>

<style scoped>
.v-card {
  border-radius: 10px;
}
</style>
