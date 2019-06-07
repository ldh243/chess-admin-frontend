<template>
  <v-app>
    <Header/>
    <router-view></router-view>
    <Footer/>
  </v-app>
</template>

<style></style>

<script>
import Header from '@/layouts/Header'
import Footer from '@/layouts/Footer'

export default {
  components: {
    Footer,
    Header
  }
}
</script>
<style scoped></style>
