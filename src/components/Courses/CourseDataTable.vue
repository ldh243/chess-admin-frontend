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
            :return-value.sync="editedCourse"
            large
            lazy
            persistent
            save-text="Lưu"
            cancel-text="Hủy bỏ"
            @open="getEditedCourse(props.item)"
            @save="changeStatus()"
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
export default {
  components: {
    Loader
  },
  created() {
    let method = 'GET'
    let url = this.$store.state.api.getCoursesPagination
    let params = {
      page: '1',
      pageSize: '500'
    }
    this.loader++
    this.callAxios(method, url, params).then(result => {
      let obj = result.data.data.content
      this.listCourses = this.formatListCourse(obj)
      this.loader--
    })
  },
  data() {
    return {
      dialog: false,
      changeStatusDetail: {
        action: '',
        email: '',
        status: ''
      },
      loader: 0,
      search: '',
      pagination: {
        rowsPerPage: 10
      },
      headers: [
        { text: 'Tên khóa học', value: 'courseName', align: 'left' },
        { text: 'Tên giảng viên', value: 'authorName', align: 'center' },
        { text: 'Ngày giờ tạo', value: 'courseCreatedDate', align: 'center' },
        { text: 'Trạng thái', value: 'status', align: 'center' },
        { text: 'Điểm yêu càu', value: 'point', align: 'center' },
        { text: '', value: 'action', sortable: false }
      ],
      listCourses: [],
      listStatus: [
        { statusId: 1, statusName: 'Đang soạn thảo' },
        { statusId: 2, statusName: 'Công khai' },
        { statusId: 3, statusName: 'Đã xóa' },
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
  methods: {
    changeStatus() {
      this.loader++
      const method = 'PUT'
      const url = this.$store.state.api.updateCourseStatus
      const data = this.editedCourse
      console.log(data)
      this.callAxios(method, url, data).then(result => {
        if (result.status === 200) {
          let course = this.listCourses.find(
            course => course.courseId === course.courseId
          )
          course.statusId = this.editedCourse.statusId
          course.statusName = this.getStatusCourse(course.statusId)
        }
      })

      this.loader--
    },
    getEditedCourse(item) {
      this.editedCourse = {
        courseId: item.courseId,
        statusId: item.statusId
      }
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