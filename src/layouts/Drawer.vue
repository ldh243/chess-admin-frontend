<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant.sync="mini"
    hide-overlay
    stateless
    orverflow
    app
    fixed
  >
    <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-tile>
          <v-list-tile-content class="title-header-parent">
            <v-list-tile-title class="title-header">COLS</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-divider></v-divider>
    <v-toolbar flat class="transparent">
      <v-list class="pa-0" subheader v-if="$store.state.user != null">
        <v-list-tile avatar :to="accountProfile">
          <v-list-tile-avatar>
            <img :src="$store.state.user.avatar">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{$store.state.user.fullName}}</v-list-tile-title>
            <v-list-tile-sub-title>{{$store.state.user.roleName}}</v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn icon @click.stop.prevent="mini = !mini">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-list class="pt-0" dense>
      <v-divider></v-divider>

      <v-list-tile v-for="item in items" :key="item.title" :to="item.path">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click.stop="dialog = true">
        <v-list-tile-action>
          <v-icon>input</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>Đăng xuất</v-list-tile-title>
        </v-list-tile-content>
        <v-layout row justify-center>
          <v-dialog v-model="dialog" width="400">
            <v-card>
              <v-card-title class="headline">Đăng xuất</v-card-title>
              <v-card-text>Bạn có chắc chắn muốn đăng xuất?</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  class="font-weight-bold"
                  color="red darken-1"
                  flat="flat"
                  @click="dialog = false"
                >Hủy bỏ</v-btn>
                <v-btn
                  class="font-weight-bold"
                  color="green darken-1"
                  flat="flat"
                  @click="logout()"
                >Đồng ý</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <Loader v-if="loader"/>
        </v-layout>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import Loader from '@/components/Loader'
export default {
  components: {
    Loader
  },
  created() {
    if (localStorage.getItem('user') == null) {
      let method = 'GET'
      let url = this.$store.state.api.getCurrentUserDetail
      this.loader++
      this.callAxios(method, url)
        .then(result => {
          let obj = result.data.data

          obj.roleName =  this.getRoleName(obj.roleId)
          obj.status = this.getStatus(obj.active)

          this.user = obj

          this.$store.commit('changeUser', obj)

          let data = JSON.stringify(obj)
          localStorage.setItem('user', data)

          this.loader--
        })
        .catch(error => {
          console.error(error)
          this.loader--
        })
    }
  },
  data() {
    return {
      loader: 0,
      drawer: true,
      accountProfile: '/dashboard/profile',
      items: [
        {
          title: 'Thống kê',
          icon: 'mdi-view-dashboard',
          path: '/dashboard/statistics'
        },
        {
          title: 'Khóa học',
          icon: 'mdi-file-document-box-outline',
          path: '/dashboard/courses'
        },
        {
          title: 'Quản lý tài khoản',
          icon: 'mdi-account',
          path: '/dashboard/accounts'
        }
      ],
      mini: true,
      dialog: false
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('user')
      localStorage.removeItem('access-token')
      this.$store.commit('changeUser', null)
      this.$router.push('/')
    }
  }
}
</script>

<style>
.title-header {
  text-align: center !important;
}
.title-header-parent {
  opacity: 1 !important;
}
</style>
