import Vue from 'vue'
const axios = require('axios')
export default Vue.mixin({
  methods: {
    async callAxios(method, url, params) {
      //get token from localStorage
      var token = this.getTokenFromLocalStorage()

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
    getStatus(active) {
      if (active) {
        return 'Kích hoạt'
      } else {
        return 'Vô hiệu hóa'
      }
    }
  }
})
