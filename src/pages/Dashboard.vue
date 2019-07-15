<template>
  <v-app id="sandbox">
    <Toolbar/>
    <Drawer/>
    <v-content style="padding-top: 64px;">
      <Content/>
    </v-content>
  </v-app>
</template>
<script>
import Drawer from '@/layouts/Drawer'
import Content from '@/layouts/Content'
import Toolbar from '@/layouts/Toolbar'
export default {
  components: {
    Drawer,
    Content,
    Toolbar
  }
}
</script>

<style scoped>
</style>