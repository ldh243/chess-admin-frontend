<template>
  <div>
    <v-card-title>
      <h2>Thông Tin Người Dùng</h2>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Tìm kiếm" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="listUsers"
      :search="search"
      hide-actions
      :pagination.sync="pagination"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.email }}</td>
        <td class="text-xs-center">{{ props.item.fullName }}</td>
        <td class="text-xs-center">{{ props.item.roleName }}</td>
        <td class="text-xs-center">
          <v-select :items="statusList" label="Hoạt động" single-line></v-select>
        </td>
      </template>
      <template v-slot:no-results>
        <v-alert :value="true" color="red" icon="warning">Người dùng "{{ search }}" không tồn tại.</v-alert>
      </template>
    </v-data-table>
    <div class="text-xs-center">
      <v-pagination v-model="pagination.page" :length="pages" circle></v-pagination>
    </div>
    <Loader v-if="loader"/>
  </div>
</template>

<script>
import Loader from '@/components/Loader'
export default {
  components: {
    Loader
  },
  created() {
    let method = 'GET'
    let url = this.$store.state.api.getUsersPagination
    let params = {
      page: '1',
      pageSize: '500'
    }
    this.loader++
    this.callAxios(method, url, params)
      .then(result => {
        this.listUsers = result.data.data.content
        this.loader--
      })
      .catch(error => {
        console.error(error)
        this.loader--
      })
  },
  data() {
    return {
      loader: 0,
      statusList: ['Kích hoạt', 'Vô hiệu hóa'],
      pagination: {},
      search: '',
      headers: [
        {
          text: 'Email',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Họ và tên', value: 'fullname', align: 'right' },
        { text: 'Vai trò', value: 'fullname', align: 'right' },
        {
          text: 'Trạng thái',
          value: 'status',
          align: 'right  ',
          sortable: false
        }
      ],
      listUsers: []
    }
  },
  computed: {
    pages() {
      if (
        this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      )
        return 0

      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    }
  }
}
</script>

<style>
</style>
