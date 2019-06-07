<template>
  <v-footer height="auto">
    <v-layout row class="bg-dark white--text text-xs-center" wrap py-4>
      <v-flex xs12 mb-3>
        <span>
          <h5 class="title font-weight-medium">A CAPSTONE PROJECT AT</h5>
        </span>
      </v-flex>
      <v-flex xs12 mb-3>
        <v-img contain :src="logoFPT" height="60"></v-img>
      </v-flex>
      <v-flex xs12>
        <span class="px-3 body-2">
          &copy; {{ new Date().getFullYear() }} Copyright
          <router-link to="/">COLS Project Team</router-link>
        </span>
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      logoFPT: require("@/assets/images/fpt-university-logo.png")
    };
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
