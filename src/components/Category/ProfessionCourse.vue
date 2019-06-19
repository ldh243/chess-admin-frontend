<template>
  <div>
    <h2 class="basic">Các khóa học chuyện nghiệp</h2>
    <hr>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="fa-search"
        label="Tìm kiếm"
        single-line
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="listCourses"
      :search="search"
      hide-actions
      :pagination.sync="pagination"
      class="elevation-1"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
      sort-icon="mdi-menu-down"
    >
      <template v-slot:items="props">
        <td style="width: 30%">{{ props.item.name }}</td>
        <td class="text-xs-center" style="width: 25%">{{ props.item.authorName }}</td>
        <td class="text-xs-center" style="width: 25%">{{ props.item.createdDate }}</td>
        <td class="text-xs-center" style="width: 20%">{{ props.item.statusName }}</td>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-2">
      <v-pagination v-model="pagination.page" :length="pages" circle></v-pagination>
    </div>
    <Loader v-if="loader"/>
  </div>
</template>

<script>
export default {}
</script>

<script>
import Loader from '@/components/Loader'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
const categoryRepository = RepositoryFactory.get('category')
export default {
  components: {
    Loader
  },
  data() {
    return {
      dialog: false,
      changeStatusDetail: {
        action: '',
        email: '',
        status: ''
      },
      loader: false,
      search: '',
      pagination: {
        rowsPerPage: 10
      },
      headers: [
        { text: 'Tên khóa học', value: 'name', align: 'left' },
        { text: 'Tên tác giả', value: 'name', align: 'center' },
        { text: 'Ngày tạo', value: 'name', align: 'center' },
        { text: 'Trạng thái', value: 'status', align: 'center' }
      ],
      listCourses: []
    }
  },
  computed: {
    pages() {
      const rowsPerPage = this.pagination.rowsPerPage
      const totalItems = this.listCourses.length
      if (rowsPerPage == null || totalItems == null) return 0

      return Math.ceil(totalItems / rowsPerPage)
    }
  },
  mounted() {
    this.loader = true
    this.getCategoryDetail(2)
    this.loader = false
  },
  methods: {
    async getCategoryDetail() {
      const { data } = await categoryRepository.getCategoryDetail(2)
      console.log(data)
      this.listCourses = this.formatListCourse(data.data.courseDetailViewModels)
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
>>> .v-menu__activator {
  justify-content: center;
}
.basic {
  text-align: center;
  font-style: inherit;
}
</style>