<template>
  <v-footer height="auto" style="border-top: 1px solid #e2e2e2">
    <v-layout row class="grey--text text-xs-center" wrap py-3>
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
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
