<template>
  <v-card class="pa-5" :elevation="3">
    <v-layout>
      <v-flex xs2 mr-3>
        <v-avatar size="70">
          <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="avatar" />
        </v-avatar>
      </v-flex>
      <v-flex xs10>
        <p
          class="mb-0 font-weight-bold title grey--text text--darken-3"
        >Phạm Hoàng Tuyết Ngân bla bla</p>
        <p class="grey--text">abcxyz@gmail.com</p>
        <p class="grey--text font-weight-thin body-1 mb-0">2 giờ trước</p>
        <v-card-actions class="pa-0">
          <v-spacer></v-spacer>
          <v-btn fab icon dark small color="grey">
            <v-icon dark>fa-info</v-icon>
          </v-btn>
          <v-btn fab icon dark small color="grey">
            <v-icon dark>far fa-grin-wink</v-icon>
          </v-btn>
          <v-btn fab icon dark small color="grey">
            <v-icon dark>far fa-frown</v-icon>
          </v-btn>
        </v-card-actions>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {}
</script>

<style>
</style>
