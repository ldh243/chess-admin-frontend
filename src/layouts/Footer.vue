<template>
  <v-footer height="auto" style="background-color: rgba(0,0,0,0.67)">
    <v-layout row class="grey--text text-xs-center" wrap py-2>
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
.v-footer {
  position: absolute;
  width: 100%;
  bottom: 0;
}
</style>
