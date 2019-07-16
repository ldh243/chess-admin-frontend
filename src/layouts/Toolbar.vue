<template>
    <v-toolbar class="v-toolbar--fixed" dark color="white" scroll-off-screen scroll-target="#scrolling-techniques">
        <v-spacer></v-spacer>
        <v-list-tile :to="'/dashboard/profile'">
        <v-list-tile-avatar >
            <img :src="$store.state.user.avatar">
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
