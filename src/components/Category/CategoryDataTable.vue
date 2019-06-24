<template>
  <div>
    <div>
      <v-btn @click="dialog = !dialog" color="success">Thêm danh mục</v-btn>
    </div>
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
        <td style="width: 15%">
          <v-btn
            @click="confirmDetailCategory(props.item), getCategoryDetail(categoryId = props.item.categoryId)"
            color="success"
          >Khóa học</v-btn>
        </td>
        <td>
          <v-btn icon flat class="btn-active-deactive" @click="confirmEditCategory(props.item)">
            <v-icon>fa-edit</v-icon>
          </v-btn>
          <v-btn icon flat class="btn-active-deactive" @click="confirmRemoveCategory(props.item)">
            <v-icon>fa-minus-circle</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-2">
      <v-pagination v-model="pagination.page" :length="pages" circle></v-pagination>
    </div>

    <!-- Create Category -->
    <v-dialog persistent v-model="dialog" max-width="500px">
      <v-card>
        <v-card-text>
          <v-text-field type="text" v-model="createdCategory.name" label="Danh mục"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="dialog = false">Hủy bỏ</v-btn>
          <v-btn
            flat
            color="primary"
            @click="createCategory(), refreshPage(), dialog = false"
          >Đồng Ý</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Show Detail Course of Catagory -->
    <v-dialog v-model="detailContainer" max-width="1000px">
      <v-card>
        <v-card-text>
          <h2 class="basic">Các khóa học {{detailCategory.name}}</h2>
        </v-card-text>
        <hr>
        <v-card>
          <BasicCourse :listCourses="listCourses"></BasicCourse>
        </v-card>
      </v-card>
    </v-dialog>

    <!-- Dialog Update Category -->
    <v-dialog persistent v-model="editDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Chỉnh Sửa Danh Mục</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap column>
              <v-flex>
                <v-text-field v-model="editedCategory.name" label="Danh mục"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions @click>
          <v-spacer></v-spacer>
          <v-btn @click="editDialog = false" color="blue darken-1" flat>Hủy</v-btn>
          <v-btn
            @click="updateCategory(), editDialog = false, refreshPage()"
            color="blue darken-1"
            flat
          >Đồng Ý</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog Remove Category-->
    <v-dialog persistent v-model="removeDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Chỉnh Sửa Danh Mục</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-flex>
              <v-card-text>Bạn có chắc chắn muốn xóa danh mục {{removedCategory.name}}</v-card-text>
            </v-flex>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="removeDialog = false" color="blue darken-1" flat>Hủy</v-btn>
          <v-btn
            @click="removeCategory(removedCategory.categoryId), removeDialog = false, refreshPage()"
            color="blue darken-1"
            flat
          >Đồng Ý</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <Loader v-if="loader"/>
  </div>
</template>


<script>
import BasicCourse from '@/components/Category/BasicCourse'
import Loader from '@/components/Loader'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
const categoryRepository = RepositoryFactory.get('category')
export default {
  components: {
    BasicCourse,
    Loader
  },
  data() {
    return {
      dialog: false,
      loader: false,
      editDialog: false,
      removeDialog: false,
      detailContainer: false,
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
        { text: '', value: 'action', sortable: false },
        { text: '', value: 'edit', sortable: false }
      ],
      listCourses: [],
      listCategory: [],
      editedCategory: [],
      createdCategory: [],
      removedCategory: [],
      detailCategory: []
    }
  },
  computed: {
    pages() {
      const rowsPerPage = this.pagination.rowsPerPage
      const totalItems = this.listCategory.length
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
    refreshPage() {
      window.location.reload()
    },
    async getCategories() {
      const { data } = await categoryRepository.getCategories()
      this.listCategory = this.formatListCourse(data.data)
    },
    async getCategoryDetail() {
      const { data } = await categoryRepository.getCategoryDetail(
        this.categoryId
      )
      this.listCourses = this.formatListCourse(data.data.courseDetailViewModels)
    },
    async createCategory() {
      const { data } = await categoryRepository.createCategory(
        this.createdCategory.name
      )
    },

    async updateCategory() {
      const { data } = await categoryRepository.updateCategory(
        this.editedCategory.categoryId,
        this.editedCategory.name
      )
      if (data.data) {
        let category = this.listCategory.find(
          category => this.editedCategory.categoryId === category.categoryId
        )
        category.name = this.editedCategory.name
      }
    },
    async removeCategory() {
      const { data } = await categoryRepository.removeCategory(
        this.removedCategory.categoryId,
        this.removedCategory.name
      )
    },
    confirmEditCategory(item) {
      this.editedCategory = this.listCategory.find(
        category => category.categoryId === item.categoryId
      )
      this.editDialog = true
    },
    confirmRemoveCategory(item) {
      this.removedCategory = this.listCategory.find(
        category => category.categoryId === item.categoryId
      )
      this.removeDialog = true
    },
    confirmDetailCategory(item) {
      this.detailCategory = this.listCategory.find(
        category => category.categoryId === item.categoryId
      )
      this.detailContainer = true
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
.basic {
  text-align: center;
  font-style: inherit;
}
</style>