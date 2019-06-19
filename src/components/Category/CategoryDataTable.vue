<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="listCategory"
      :search="search"
      hide-actions
      :pagination.sync="pagination"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td style="width: 50%">{{ props.item.name}}</td>
        <td class="justify-center layout px-0">
          <v-btn @click="showCourse(props.item.categoryId)" color="success">Khóa học</v-btn>
        </td>
      </template>
    </v-data-table>
    <hr>
    <hr>
    <div class="div1" v-if="categoryId == 1">
      <BasicCourse/>
    </div>
    <div class="div1" v-else-if="categoryId == 2">
      <ProfessionCourse/>
    </div>
    <div class="div1" v-else-if="categoryId == 3">
      <AmateurCourse/>
    </div>

    <Loader v-if="loader"/>
  </div>
</template>

<script>
export default {}
</script>

<script>
import BasicCourse from '@/components/Category/BasicCourse'
import ProfessionCourse from '@/components/Category/ProfessionCourse'
import AmateurCourse from '@/components/Category/AmateurCourse'
import Loader from '@/components/Loader'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
const categoryRepository = RepositoryFactory.get('category')
export default {
  components: {
    BasicCourse,
    ProfessionCourse,
    AmateurCourse,
    Loader
  },
  data() {
    return {
      dialog: false,
      loader: false,
      categoryId: '',
      search: '',
      pagination: {
        rowsPerPage: 10
      },
      headers: [
        {
          text: 'Tên Danh Mục Khóa Học ',
          value: 'name',
          align: 'left',
          sortable: false
        },
        { text: '', value: 'action', sortable: false }
      ],
      listCategory: []
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
    this.getCategories()
    this.loader = false
  },
  methods: {
    showCourse(number) {
      this.categoryId = number
    },
    async getCategories() {
      const { data } = await categoryRepository.getCategories()
      console.log(data)
      this.listCategory = this.formatListCourse(data.data)
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
.div1 {
  padding-top: 50px;
  border: 5;
}
</style>