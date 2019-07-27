<template>
  <v-app-bar
    absolute
    style="padding-left: 256px"
    :height="72"
    class="v-toolbar--fixed"
    color="white"
    scroll-target="#scrolling-techniques"
  >
    <v-breadcrumbs class="grey--text" :items="items" divider=">"></v-breadcrumbs>
    <v-spacer></v-spacer>
    <v-menu
      v-model="notification"
      :close-on-content-click="false"
      offset-y bottom left
      transition="slide-y-transition"
    >
    <template v-slot:activator="{ on }">
        <v-btn v-on="on" icon color="grey">
      <v-badge color="red darken-1" right overlap>
        <template v-slot:badge>0</template>
        <v-icon>fa-bell</v-icon>
      </v-badge>
    </v-btn>
      </template>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="body-2">John Leider đăng kí làm người hướng dẫn</v-list-item-title>
              <v-list-item-subtitle>Ngay bây giờ</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-avatar>
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title class="body-2">John Leider đăng kí làm người hướng dẫn</v-list-item-title>
              <v-list-item-subtitle>2 tiếng trước</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
    </v-menu>
    <v-toolbar-items class="align-center py-1 pr-3">
      <v-divider color="#BDBDBD" class="mx-4" vertical inset></v-divider>
        <v-menu bottom left offset-y transition="slide-y-transition">
          <template v-slot:activator="{on}">
            <a v-on="on">
              <v-list-tile>
        <span class="grey--text text--darken-3 mr-2 body-2">{{$store.state.user.fullName}}</span>
        </v-list-tile>
              <v-avatar :size="35">
                <img :src="$store.state.user.avatar" />
              </v-avatar>
            </a>
          </template>
          <v-list>
            <v-list-item :to="'/dashboard/profile'">
              <v-list-item-title>Thông tin cá nhân</v-list-item-title>
            </v-list-item>
            <v-list-item @click="signOut">
              <v-list-item-title>Đăng xuất</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Toolbar',
  data() {
    return {
      chessLogo: require('@/assets/images/chess.png'),
      items: [
        {
          text: 'Dashboard',
          disabled: false,
          href: 'breadcrumbs_dashboard'
        },
        {
          text: 'Link 1',
          disabled: false,
          href: 'breadcrumbs_link_1'
        },
        {
          text: 'Link 2',
          disabled: true,
          href: 'breadcrumbs_link_2'
        }
      ]
    }
  },
  methods: {
    signOut() {
      localStorage.removeItem('user')
      localStorage.removeItem('access-token')
      this.$store.commit('changeUser', null)
      this.$router.push('/')
    }
  }
}
</script>

<style>
.v-breadcrumbs__item {
  color: #ffab00 !important;
}
.v-breadcrumbs__item--disabled {
  color: #bdbdbd !important;
}
.v-menu__content {
  border-radius: 10px;
}
</style>
