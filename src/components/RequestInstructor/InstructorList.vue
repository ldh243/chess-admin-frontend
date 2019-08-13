<template>
  <div>
    <v-card-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="fa-search"
        label="Tìm kiếm"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="listUsers"
      :search="search"
      hide-actions
      :pagination.sync="pagination"
      class="elevation-1"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
      sort-icon="mdi-menu-down"
    >
      <template v-slot:items="props">
        <td style="width: 25%">{{ props.item.fullName }}</td>
        <td class="text-xs-center" style="width: 20%">{{ props.item.email }}</td>
        <td class="text-xs-center" style="width: 15%">{{ props.item.roleName }}</td>
        <td class="text-xs-center" style="width: 15%">{{ props.item.status }}</td>
        <td class="text-xs-center" style="width: 15%">
          <v-btn
            icon
            flat
            @click="getUsersById(userId = props.item.userId), detailDialog = !detailDialog"
          >
            <v-icon>fa-calendar-week</v-icon>
          </v-btn>
        </td>
        <td class="justify-center layout px-0">
          <v-btn
            icon
            flat
            color="error"
            v-if="!props.item.isActive"
            class="btn-active-deactive"
            @click="showConfirmRequestInstructor(true, props.item)"
          >
            <v-icon large>fa-lock</v-icon>
          </v-btn>
          <v-btn icon flat color="success" v-if="props.item.isActive" class="btn-active-deactive">
            <v-icon>fa-lock-open</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-2">
      <v-pagination v-model="pagination.page" :length="pages" circle></v-pagination>
    </div>
    <Loader v-if="loader" />

    <!-- Information Instructor -->
    <v-dialog v-model="detailDialog" max-width="90%">
      <v-card>
        <v-toolbar light color="yellow lighten-1">
          <v-toolbar-title class="fontWord">Thông Tin Tài Khoản</v-toolbar-title>
        </v-toolbar>

        <div>
          <InfomationInstructor :detailUser="userDetail" :certificates="certificate" />
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="detailDialog = false" color="blue darken-1" flat>Hủy</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {}
</script>

<script>
import Loader from '@/components/Loader'
import InfomationInstructor from '@/components/RequestInstructor/InfomationInstructor'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
import { Certificate } from 'crypto'
const userRepository = RepositoryFactory.get('user')
export default {
  components: {
    InfomationInstructor,
    Loader
  },
  data() {
    return {
      dialog: false,
      detailDialog: false,
      editDialog: false,
      editedUser: [],
      loader: false,
      search: '',
      email: '',
      pagination: {
        rowsPerPage: 10
      },

      headers: [
        { text: 'Họ và tên', value: 'fullName', align: 'left' },
        { text: 'Email', value: 'email', align: 'center' },
        { text: 'Vai trò', value: 'roleName', align: 'center' },
        { text: 'Trạng thái', value: 'status', align: 'center' },
        { text: 'Thông tin', value: 'infomation', align: 'center' },
        { text: '', value: 'action', sortable: false }
      ],
      listUsers: [],
      userDetail: {},
      certificate: []
    }
  },
  computed: {
    pages() {
      const rowsPerPage = this.pagination.rowsPerPage
      const totalItems = this.listUsers.length
      if (rowsPerPage == null || totalItems == null) return 0

      return Math.ceil(totalItems / rowsPerPage)
    }
  },
  mounted() {
    this.loader = true
    this.getUsersRequestInstructor()
    this.loader = false
  },
  methods: {
    async getUsersRequestInstructor() {
      const { data } = await userRepository.getUsersRequestInstructor(
        1,
        500,
        false,
        1
      )
      this.listUsers = this.formatListRequestInstructor(data.data.content)
      console.log(data)
    },
    async getUsersById() {
      const { data } = await userRepository.getUsersById(this.userId)
      this.userDetail = data.data
      this.certificate = data.data.certificates
      console.log(this.certificate)
    },
    showConfirmRequestInstructor(status, item) {
      this.editedUser = this.listUsers.find(user => user.userId === item.userId)
      this.editedUser.action = this.editedUser.isActive
        ? 'Chờ xét duyệt'
        : 'xét duyệt'
      this.$swal({
        title: `Xét duyệt tài khoản`,
        text: `Xét duyệt tài khoản ${this.editedUser.email} trở thành người hướng dẫn!`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy'
      }).then(result => {
        if (result.value) {
          this.$swal(
            'Xét duyệt',
            `Xét duyệt tài khoản ${this.editedUser.email} thành công`,
            'success'
          )
          this.changeStatus()
        }
      })
    },
    async changeStatus() {
      this.loader++
      const data = {
        userId: this.editedUser.userId,
        active: !this.editedUser.isActive
      }
      const { result } = await userRepository.updateStatus(data)
      this.editedUser.isActive = !this.editedUser.isActive
      this.editedUser.isActive
        ? (this.editedUser.status = 'Kích hoạt')
        : (this.editedUser.status = 'Chờ xét duyệt')
      this.loader--
    },
    confirmChangeStatus(status, item) {
      this.editedUser = this.listUsers.find(user => user.userId === item.userId)
      this.editedUser.action = this.editedUser.isActive
        ? 'Chờ xét duyệt'
        : 'xét duyệt'
      this.showConfirmRequestInstructor(item.userId)
    }
  }
}
</script>
<style scoped>
.btn-active-deactive {
  width: 35px !important;
  height: 35px !important;
}
.btn-active-deactive i {
  font-size: 17px !important;
}
.fontWord {
  font-family: Comic Sans MS;
}
.fontWordBtn {
  font-family: Tahoma;
}
</style>