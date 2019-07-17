<template>
  <v-toolbar
    class="v-toolbar--fixed"
    dark
    color="white"
    scroll-off-screen
    scroll-target="#scrolling-techniques"
  >
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-spacer></v-spacer>
    <v-badge color="cyan" right>
      <template v-slot:badge>
        <span>5</span>
      </template>
      <v-icon @click icon large color="warning" flat class="btn-active-deactive">fa-bell</v-icon>
    </v-badge>&emsp;
    <!-- <v-btn icon large color="warning" flat class="btn-active-deactive">
      <v-icon>fa-bell</v-icon>
    </v-btn>-->

    <v-list-tile :to="'/dashboard/profile'">
      <v-list-tile-avatar>
        <img :src="$store.state.user.avatar" />
      </v-list-tile-avatar>
      <span class="grey--text">{{$store.state.user.fullName}}</span>
    </v-list-tile>
  </v-toolbar>
</template>

<script>
export default {
  name: 'Toolbar',
  data() {
    return {
      chessLogo: require('@/assets/images/chess.png')
    }
  }
}
</script>

<style scoped>
</style>
