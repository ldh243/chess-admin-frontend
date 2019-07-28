<template>
  <v-card :elevation="8">
    <v-card-title>
      <h3 class="headline">Thông tin</h3>
      <v-spacer></v-spacer>
        <v-btn color="darken-3" fab small @click="isEditing = !isEditing">
          <v-icon v-if="isEditing">mdi-close</v-icon>
          <v-icon v-else>mdi-pencil</v-icon>
        </v-btn>
    </v-card-title>
    <v-form>
      <v-container pa-5 grid-list-xl>
        <v-layout wrap>
          <v-flex xs12>
            <v-text-field color="amber darken-1" :value="$store.state.user.fullName" label="Họ và tên" :disabled="!isEditing"></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field :value="$store.state.user.email" label="Email" disabled></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field :value="$store.state.user.status" label="Trạng thái" disabled></v-text-field>
          </v-flex>
          <v-flex xs12 v-if="isInstructor">
            <v-textarea
          color="amber darken-1"
          name="input-7-1"
          label="Thành tích"
          value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
          hint="Hint text"
          :disabled="!isEditing"
        ></v-textarea>
        <v-layout wrap>
            <v-flex
              v-for="n in 2"
              :key="n"
              xs4
            >
              <v-card flat tile>
                <v-img
                  :src="`https://unsplash.it/150/300?image=${Math.floor(Math.random() * 100) + 1}`"
                  height="180px"
                ></v-img>
              </v-card>
            </v-flex>
          </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
    <!-- <v-card-text>
      <v-textarea :disabled="!isEditing" name="input-7-1" label="Giải thưởng" auto-grow></v-textarea>
    </v-card-text>-->
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
      <!-- <v-btn :disabled="!isEditing" color="success" @click="save">Lưu</v-btn> -->
    </v-card-actions>
    <v-snackbar v-model="hasSaved" :timeout="2000" absolute bottom left>Thông tin đã được cập nhật</v-snackbar>
  </v-card>
</template>

<script>
// import UploadButton from 'vuetify-upload-button'
export default {
  props: {
    isInstructor: {
      type: Boolean,
      default: false
    }
  },
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
  },
  created() {
    this.isInstructor = this.$store.state.user.roleId === 1 ? true : false
  }
}
</script>

<style scoped>
</style>
