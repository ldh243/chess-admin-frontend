<template>
  <v-toolbar :clipped-left="primaryDrawer.clipped" app absolute>
    <div class="text-xs-center">
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">Dropdown</v-btn>
        </template>
        <v-list>
          <v-list-tile v-for="(item, index) in items" :key="index" @click>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </div>
    <v-spacer></v-spacer>
    <v-text-field label="Search" prepend-inner-icon="search"></v-text-field>
    <v-btn
      black--text
      round
      color="white"
      class="pr-3 font-weight-medium my-5"
      :style="btnLoginGoogle"
      >Sign in</v-btn
    >
  </v-toolbar>
</template>

<script>
export default {
  data() {
    return {
      loginBackgroundImage: require('@/assets/images/google-logo.png'),
      primaryDrawer: {
        model: null,
        type: 'default (no property)',
        clipped: false,
        floating: false,
        mini: false
      },
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' }
      ]
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

<style scoped></style>
