<template>
  <v-footer height="auto">
    <v-layout row class="bg-dark white--text text-xs-center" wrap py-2>
      <v-flex xs4 offset-xs8>
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
