<template>
  <v-app>
    <router-view></router-view>
    <Footer/>
  </v-app>
</template>

<style></style>

<script>
import Footer from '@/layouts/Footer'

export default {
  components: {
    Footer
  }
}
</script>
<style scoped></style>
