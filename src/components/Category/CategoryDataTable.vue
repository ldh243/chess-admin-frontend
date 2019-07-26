<template>
  <div>
    <v-flex pa-2>
      <v-btn color="success" @click="showCreateCategoryDialog()">Thêm danh mục</v-btn>
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
        <td style="width: 70%">{{ props.item.name }}</td>
        <td>
          <v-btn
            color
            icon
            small
            @click="
              confirmDetailCategory(props.item),
                getCourseByCategoryId((categoryId = props.item.categoryId))
            "
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
    <v-dialog v-model="createCategoryDialog" max-width="500px">
      <v-card>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card-text>
            <v-text-field
              v-model="newCategoryName"
              type="text"
              :counter="50"
              :rules="categoryNameRules"
              label="Danh mục"
              required
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="error" @click="createCategoryDialog = false">Hủy bỏ</v-btn>
            <v-btn
              flat
              color="success"
              @click="createCategory()"
              :disabled="statusCreateCategory"
            >Đồng Ý</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <!-- Show Detail Course of Catagory -->
    <v-dialog v-model="detailContainer" max-width="1000px">
      <v-card>
        <v-card-text>
          <h2 class="basic">Các khóa học {{ detailCategory.name }}</h2>
        </v-card-text>
        <hr />
        <v-card>
          <BasicCourse :list-courses="listCourses"></BasicCourse>
        </v-card>
      </v-card>
    </v-dialog>

    <!-- Dialog Update Category -->
    <v-dialog v-model="editDialog" max-width="500px">
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
            <v-btn color="blue darken-1" flat @click="editDialog = false">Hủy</v-btn>
            <v-btn color="blue darken-1" flat @click="updateCategory()">Đồng Ý</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    <!-- Dialog Remove Category-->
    <v-dialog v-model="removeDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">XÓA DANH MỤC</span>
        </v-card-title>
        <v-card-text>
          Bạn có chắc chắn muốn xóa danh mục
          <b>{{ selectedCategory.name }}</b>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" flat @click="removeDialog = false">Hủy</v-btn>
          <v-btn
            color="success"
            flat
            @click="
              removeCategory(selectedCategory), (removeDialog = false)
            "
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
      createCategoryDialog: false,
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
          sortable: true
        },
        { text: '', value: 'action', sortable: false }
      ],
      listCourses: [],
      listCategory: [],
      editedCategory: [],
      newCategoryName: '',
      selectedCategory: [],
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
    },
    statusCreateCategory() {
      if (
        this.newCategoryName.length > 0 &&
        this.newCategoryName.length <= 50
      ) {
        return false
      }
      return true
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
      this.listCategory = data.data
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
      const { data } = await categoryRepository.createCategory(
        this.newCategoryName
      )
      // Xuất thông báo tạo category thành công and đóng dialog
      this.listRules = data.data
      if (data.data.success) {
        this.createCategoryDialog = false
        this.listCategory.push({
          categoryId: data.data.savedId,
          name: this.newCategoryName
        })
      }
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
      this.editDialog = fals
      e
    },
    async removeCategory() {
      const { data } = await categoryRepository.removeCategory(
        this.selectedCategory.categoryId,
        this.selectedCategory.name
      )
      if (data.data) {
        this.listCategory = this.listCategory.filter(
          el => el.categoryId != this.selectedCategory.categoryId
        )
      }
    },
    confirmEditCategory(item) {
      this.editedCategory = this.getCategoryById(item.categoryId)
      this.editDialog = true
    },
    confirmRemoveCategory(item) {
      this.selectedCategory = this.getCategoryById(item.categoryId)
      this.removeDialog = true
    },
    confirmDetailCategory(item) {
      this.detailCategory = this.getCategoryById(item.categoryId)
      this.detailContainer = true
    },

    getCategoryById(categoryId) {
      return this.listCategory.find(
        category => category.categoryId === categoryId
      )
    },
    showCreateCategoryDialog() {
      this.newCategoryName = ''
      this.createCategoryDialog = true
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
