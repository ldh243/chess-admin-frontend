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
        <td style="width: 25%">{{ props.item.courseName }}</td>

        <td class="text-xs-center" style="width: 25%">{{ props.item.authorName }}</td>
        <td class="text-xs-center" style="width: 20%">{{ props.item.courseCreatedDate }}</td>
        <td class="text-xs-center" style="width: 15%">
          <v-edit-dialog
            large
            lazy
            persistent
            save-text="Lưu"
            cancel-text="Hủy bỏ"
            @open="getEditedCourse(props.item)"
            @save="updateCourseStatus()"
          >
            <div>{{ props.item.statusName }}</div>
            <template v-slot:input>
              <div class="mt-3 title">Cập nhật trạng thái</div>
              <v-select
                v-model="editedCourse.statusId"
                :items="listStatus"
                item-text="statusName"
                item-value="statusId"
              ></v-select>
            </template>
          </v-edit-dialog>
        </td>
        <td class="text-xs-center" style="width: 15%">{{ props.item.point }}</td>
        <td class="justify-center layout px-0">
          <v-btn icon flat class="btn-active-deactive">
            <v-icon>fa-edit</v-icon>
          </v-btn>
        </td>
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
const courseRepository = RepositoryFactory.get('course')
export default {
  components: {
    Loader
  },
  data() {
    return {
      dialog: false,
      removeDialog: false,
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
        { text: 'Tên khóa học', value: 'courseName', align: 'left' },
        { text: 'Tên giảng viên', value: 'authorName', align: 'center' },
        { text: 'Ngày giờ tạo', value: 'courseCreatedDate', align: 'center' },
        { text: 'Trạng thái', value: 'status', align: 'center' },
        { text: 'Điểm yêu cầu', value: 'point', align: 'center' },
        { text: '', value: 'action', sortable: false }
      ],
      listCourses: [],
      listStatus: [
        { statusId: 1, statusName: 'Đang soạn thảo' },
        { statusId: 2, statusName: 'Công khai' },
        { statusId: 4, statusName: 'Chờ duyệt' },
        { statusId: 5, statusName: 'Từ chối' }
      ],
      editedCourse: {}
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
    this.getCoursesPagination()
    this.loader = false
  },
  methods: {
    getEditedCourse(item) {
      this.editedCourse = {
        courseId: item.courseId,
        statusId: item.statusId
      }
    },
    async getCoursesPagination() {
      const { data } = await courseRepository.getCoursesPagination(1, 500)
      this.listCourses = this.formatListCourse(data.data.content)
      console.log(data)
    },
    async updateCourseStatus() {
      const { data } = await courseRepository.updateCourseStatus(
        this.editedCourse.courseId,
        this.editedCourse.statusId
      )
      if (data.data) {
        let course = this.listCourses.find(
          course => this.editedCourse.courseId === course.courseId
        )
        course.statusId = this.editedCourse.statusId
        course.statusName = this.getStatusCourse(course.statusId)
      }
      console.log(data)
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
</style>