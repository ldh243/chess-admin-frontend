<template>
  <v-flex>
    <v-data-table
      :headers="headers"
      :items="listUsers"
      :search="search"
      hide-actions
      :pagination.sync="pagination"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
      sort-icon="mdi-menu-down"
      :items-per-page="5"
      hide-default-footer
    >
      <template v-slot:items="props">
        <td style="width: 25%">{{ props.item.fullName }}</td>
        <td class="text-xs-center" style="width: 25%">{{ props.item.email }}</td>
        <td class="text-xs-center" style="width: 25%">{{ props.item.roleName }}</td>
        <td class="text-xs-center" style="width: 20%">{{ props.item.status }}</td>
        <td class="justify-center layout px-0">
          <v-btn
            icon
            flat
            color="success"
            v-if="!props.item.isActive"
            class="btn-active-deactive"
            @click="confirmChangeStatus(true, props.item)"
          >
            <v-icon>fa-lock-open</v-icon>
          </v-btn>
          <v-btn
            icon
            flat
            color="error"
            v-if="props.item.isActive"
            class="btn-active-deactive"
            @click="confirmChangeStatus(false, props.item)"
          >
            <v-icon>fa-lock</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
    <Pagination 
    :currentPage="currentPage"
    :pages="pages" 
    :rowDataLength="listUsers.length" 
    :isShowEmptyMessage="isShowEmptyMessage"
    @triggerpaging="handlPaging($event)"/>
    <Loader v-if="loader"/>
    <v-dialog v-model="dialog" width="400">
      <v-card>
        <v-card-title class="headline">Xác nhận</v-card-title>
        <v-card-text>
          Bạn có chắc chắn muốn
          <b>{{editedUser.action}}</b>
          tài khoản
          <b>{{editedUser.email}}</b>?
        </v-card-text>
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
            @click="changeStatus(), dialog = false"
          >Đồng ý</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-flex>
</template>

<script>
export default {}
</script>

<script>
import Pagination from '@/components/kit/Pagination'
import Loader from '@/components/Loader'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
const userRepository = RepositoryFactory.get('user')
export default {
  components: {
    Loader,
    Pagination
  },
  props: {
    search: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialog: false,
      editDialog: false,
      editedUser: [],
      loader: false,
      // search: '',
      pagination: {
        rowsPerPage: 10
      },
      headers: [
        { text: 'Họ và tên', value: 'fullName', align: 'left' },
        { text: 'Email', value: 'email', align: 'center' },
        { text: 'Vai trò', value: 'roleName', align: 'center' },
        { text: 'Trạng thái', value: 'status', align: 'center' },
        { text: '', value: 'action', sortable: false }
      ],
      listUsers: [],
      isShowEmptyMessage:false,
      currentPage:1
    }
  },
  mounted() {
    this.loader = true
    this.getUsersPagination()
    this.loader = false
  },
  computed: {
    pages() {
      const rowsPerPage = this.pagination.rowsPerPage
      const totalItems = this.listUsers.length
      if (rowsPerPage == null || totalItems == null) return 0
      return Math.ceil(totalItems / rowsPerPage)
    }
  },
  methods: {
    async getUsersPagination() {
      const { data } = await userRepository.getUsersPagination(1, 500)
      if(data.data){
        this.listUsers = this.formatListUser(data.data.content)
      }
    },
    async changeStatus() {
      this.loader++
      const data = {
        userId: this.editedUser.userId,
        active: !this.editedUser.isActive
      }
      const {result} = await userRepository.updateStatus(data)
      this.editedUser.isActive = !this.editedUser.isActive
      this.editedUser.isActive ? this.editedUser.status = 'Kích hoạt' : this.editedUser.status = 'Vô hiệu hóa'
      this.loader--
    },
    confirmChangeStatus(status, item) {
      this.editedUser = this.listUsers.find(user => user.userId === item.userId)
      this.editedUser.action = this.editedUser.isActive
        ? 'vô hiệu hóa'
        : 'kích hoạt'
      this.dialog = true
    },
    handlPaging(e){
      alert('page:' + e)
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
</style>