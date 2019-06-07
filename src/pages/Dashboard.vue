<template>
  <v-app id="sandbox">
    <Drawer/>
    <v-content>
      <Content/>
    </v-content>
  </v-app>
</template>
<script>
import Drawer from '@/layouts/Drawer'
import Content from '@/layouts/Content'
export default {
  components: {
    Drawer,
    Content
  }
}
</script>

<style scoped>
</style>