<template>
  <div>
    <v-flex pa-2>
      <v-btn @click="dialog = !dialog" color="success">Thêm danh mục</v-btn>
    </v-flex>
    <v-data-table
      :headers="headers"
      :items="listCategory"
      :search="search"
      hide-actions
      :pagination.sync="pagination"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td style="width: 70%">{{ props.item.name}}</td>
        <td>
          <v-btn
            @click="confirmDetailCategory(props.item), getCourseByCategoryId(categoryId = props.item.categoryId)"
            color
            icon
            small
          >
            <v-icon>fa-list</v-icon>
          </v-btn>
          <v-btn icon flat class="btn-active-deactive" @click="confirmEditCategory(props.item)">
            <v-icon>fa-edit</v-icon>
          </v-btn>
          <v-btn icon flat class="btn-active-deactive" @click="confirmRemoveCategory(props.item)">
            <v-icon>fa-trash</v-icon>
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
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card-text>
            <v-text-field
              type="text"
              :counter="50"
              :rules="categoryNameRules"
              v-model="createdCategory.name"
              label="Danh mục"
              required
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="dialog = false">Hủy bỏ</v-btn>
            <v-btn flat color="primary" @click="createCategory()">Đồng Ý</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <!-- Show Detail Course of Catagory -->
    <v-dialog v-model="detailContainer" max-width="1000px">
      <v-card>
        <v-card-text>
          <h2 class="basic">Các khóa học {{detailCategory.name}}</h2>
        </v-card-text>
        <hr />
        <v-card>
          <BasicCourse :listCourses="listCourses"></BasicCourse>
        </v-card>
      </v-card>
    </v-dialog>

    <!-- Dialog Update Category -->
    <v-dialog persistent v-model="editDialog" max-width="500px">
      <v-card>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card-title>
            <span class="headline">CHỈNH SỬA DANH MỤC</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap column>
                <v-flex>
                  <v-text-field
                    v-model="editedCategory.name"
                    :counter="50"
                    :rules="categoryNameRules"
                    label="Danh mục"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="editDialog = false" color="blue darken-1" flat>Hủy</v-btn>
            <v-btn @click="updateCategory()" color="blue darken-1" flat>Đồng Ý</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    <!-- Dialog Remove Category-->
    <v-dialog persistent v-model="removeDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">XÓA DANH MỤC</span>
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
            @click="removeCategory(removedCategory.categoryId), removeDialog = false"
            color="blue darken-1"
            flat
          >Đồng Ý</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <Loader v-if="loader" />
  </div>
</template>


<script>
import BasicCourse from '@/components/Category/BasicCourse'
import Loader from '@/components/Loader'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
const categoryRepository = RepositoryFactory.get('category')
const courseRepository = RepositoryFactory.get('course')
export default {
  components: {
    BasicCourse,
    Loader
  },
  data() {
    return {
      valid: true,
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
        { text: '', value: 'action', sortable: false }
      ],
      listCourses: [],
      listCategory: [],
      editedCategory: [],
      createdCategory: [],
      removedCategory: [],
      detailCategory: [],
      listRules: {},
      categoryNameRules: [
        v => !!v || 'Tên danh mục không được để trống',
        v => (v && v.length <= 50) || 'Tên danh mục không được quá 50 ký tự'
      ]
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
    async getCourseByCategoryId() {
      const { data } = await courseRepository.getCourseByCategoryId(
        this.categoryId,
        1,
        500
      )
      this.listCourses = this.formatListCourse(data.data.content)
    },
    async createCategory() {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
      const { data } = await categoryRepository.createCategory(
        this.createdCategory.categoryId,
        this.createdCategory.name
      )

      // if (data.data) {
      //   this.listCategory.categoryId = this.listRules.savedId
      //   this.listCategory
      // }

      // Xuất thông báo tạo category thành công and đóng dialog
      this.listRules = data.data
      if (this.listRules.savedId != 0) {
        let r = confirm('Tạo danh mục thành công !')
        this.dialog = false
      }
    },
    async updateCategory() {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
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
      this.editDialog = fals
      e
    },
    async removeCategory() {
      const { data } = await categoryRepository.removeCategory(
        this.removedCategory.categoryId,
        this.removedCategory.name
      )
      if (data.data) {
        this.listCategory = this.listCategory.filter(
          el => el.categoryId != this.removedCategory.categoryId
        )
      }
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