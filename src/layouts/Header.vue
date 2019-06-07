<template>
  <v-toolbar :clipped-left="primaryDrawer.clipped" app absolute class="bg-dark">
    <v-flex xs1>
      <router-link to="/">
        <v-layout justify-center align-center fill-height>
          <img :src="chessLogo">
          <span class="white--text text-logo ml-2">COLS</span>
        </v-layout>
      </router-link>
    </v-flex>
    <v-flex xs6 v-if="$store.state.user">
      <v-text-field label="Search" prepend-inner-icon="search"></v-text-field>
    </v-flex>
  </v-toolbar>
</template>

<script>
export default {
  data() {
    return {
      chessLogo: require('@/assets/images/chess.png'),
      primaryDrawer: {
        model: null,
        type: 'default (no property)',
        clipped: false,
        floating: false,
        mini: false
      }
    }
  },
  computed: {
    btnLoginGoogle() {
      return {
        backgroundImage: `url(${this.loginBackgroundImage})`,
        backgroundPosition: `10px center`,
        backgroundSize: `30px`,
        paddingLeft: `50px`
      }
    }
  }
}
</script>

<style scoped>
.v-image {
  float: left;
}
.text-logo {
  font-weight: bold;
  font-size: 16px;
}
img {
  width: 40px;
  height: 40px;
}
</style>
