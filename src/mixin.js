import Vue from 'vue'
import firebase from 'firebase'
const axios = require('axios')
export default Vue.mixin({
  methods: {
    async callAxios(method, url, params) {
      //get token from localStorage
      var token = this.getTokenFromLocalStorage()

      // axios.interceptors.response.use(
      //   function(response) {
      //     return response
      //   },
      //   function(error) {
      //     if (
      //       error.response.status &&
      //       (error.response.status === 403 || error.response.status === 401)
      //     ) {
      //       localStorage.removeItem('access-token')
      //       localStorage.removeItem('user')
      //       window.location.reload()
      //     }
      //   }
      // )

      //set config for axios
      let config = {
        method: method,
        url: url,
        params: params,
        headers: {
          Authorization: 'Chess ' + token
        }
      }
      return await axios(config)
    },

    getCurrentPage() {
      return window.location.href
    },
    getTokenFromLocalStorage() {
      return localStorage.getItem('access-token')
    },
    getRoleName(roleId) {
      switch (roleId) {
        case 1:
          return 'Người hướng dẫn'
        case 2:
          return 'Người học'
        case 3:
          return 'Quản trị viên'
        case 4:
          return 'Thành viên mới'
      }
    },
    getStatusUser(active) {
      if (active) {
        return 'Kích hoạt'
      } else {
        return 'Vô hiệu hóa'
      }
    },

    formatListUser(users) {
      users.forEach(user => {
        user.roleName = this.getRoleName(user.roleId)
        user.status = this.getStatusUser(user.isActive)
      })
      return users
    },

    getStatusCourse(statusId) {
      switch (statusId) {
        case 1:
          return 'Đang soạn thảo'
        case 2:
          return 'Công khai'
        case 3:
          return 'Đã xóa'
        case 4:
          return 'Chờ duyệt'
        case 5:
          return 'Từ chối'
      }
    },
    getLessonTypeName(lessonTypeId) {
      switch (lessonTypeId) {
        case 2:
          return 'Thực hành'
        case 3:
          return 'Lý thuyết'
      }
    },
    getDateTimeFormat(datetime) {
      const date = new Date(Date.parse(datetime))
      return date.toLocaleString()
    },
    formatListCourse(courses) {
      courses.forEach(course => {
        course.statusName = this.getStatusCourse(course.statusId)
        course.courseCreatedDate = this.getDateTimeFormat(
          course.courseCreatedDate
        )
      })
      return courses
    },
    async uploadImageByDataURL(image, imageName, directory) {
      const uploadTask = firebase
        .storage()
        .ref(`images/${directory}/${imageName}`)
      const link = await uploadTask
        .putString(image, 'data_url')
        .then(async () => {
          const imageLink = await firebase
            .storage()
            .ref(`images/${directory}`)
            .child(`${imageName}`)
            .getDownloadURL()
            .then(url => {
              console.log(url)
              return url
            })
          return imageLink
        })
      return link
    }
  }
})
