<template>
  <div>
    <v-card-title>
      <h2>Thông Tin Người Dùng</h2>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Tìm kiếm" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
      hide-actions
      :pagination.sync="pagination"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-center">{{ props.item.email }}</td>
        <td class="text-xs-center">{{ props.item.fullname }}</td>
        <td class="text-xs-center">{{ props.item.phone }}</td>
        <td class="text-xs-center">{{ props.item.address }}</td>
        <td class="text-xs-center">
          <v-select :items="items" label="Hoạt động" single-line></v-select>
        </td>
      </template>
      <template v-slot:no-results>
        <v-alert :value="true" color="red" icon="warning">Người dùng "{{ search }}" không tồn tại.</v-alert>
      </template>
    </v-data-table>
    <div class="text-xs-center">
      <v-pagination v-model="pagination.page" :length="pages" circle></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: ['Hoạt động', 'Ngưng hoạt động'],
      pagination: {},
      selected: [],
      search: '',
      headers: [
        {
          text: 'Tên tài khoản',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Email', value: 'email', align: 'center' },
        { text: 'Họ và tên', value: 'fullname', align: 'center' },
        { text: 'Số điện thoại', value: 'phone', align: 'center' },
        { text: 'Địa chỉ', value: 'address', align: 'center' },
        {
          text: 'Trạng thái',
          value: 'status',
          align: 'left  ',
          sortable: false
        }
      ],
      desserts: [
        {
          name: 'tungapolo',
          email: 'tungapolo123@gmail.com',
          fullname: 'Thanh Tùng',
          phone: '01323434334',
          address: '123 Võ Thị Sáu'
        },
        {
          name: 'abc',
          email: 'abc@gmail.com',
          fullname: 'abcxyz',
          phone: '01323434344',
          address: '111 Trần Phú'
        },
        {
          name: 'abc',
          email: 'abc@gmail.com',
          fullname: 'abcxyz',
          phone: '01323434344',
          address: '111 Trần Phú'
        },
        {
          name: 'abc',
          email: 'abc@gmail.com',
          fullname: 'abcxyz',
          phone: '01323434344',
          address: '111 Trần Phú'
        },
        {
          name: 'abc',
          email: 'abc@gmail.com',
          fullname: 'abcxyz',
          phone: '01323434344',
          address: '111 Trần Phú'
        },
        {
          name: 'abc',
          email: 'abc@gmail.com',
          fullname: 'abcxyz',
          phone: '01323434344',
          address: '111 Trần Phú'
        }
      ]
    }
  },
  computed: {
    pages() {
      if (
        this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      )
        return 0
      console.log(this.pagination.rowsPerPage)
      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    }
  }
}
</script>

<style>
</style>
