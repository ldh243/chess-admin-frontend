import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    api: {
      //user
      login: 'http://cols-be.ml/oauth2/authorize/google',
      getCurrentUserDetail: 'http://cols-be.ml/user/get-current-user-detail',
      getUsersPagination: 'http://cols-be.ml/user/get-users-pagination',
      updateUserStatus: 'http://cols-be.ml/user/update-status',

      //course
      getCoursesPagination: 'http://cols-be.ml/course/get-course-pagination',
      updateCourseStatus: 'http://cols-be.ml/course/update-course-status'
    },
    role: {
      instructor: '1',
      learner: '2',
      admin: '3',
      registrator: '4'
    },
    user: JSON.parse(localStorage.getItem('user'))
  },
  mutations: {
    changeUser(state, payload) {
      state.user = payload
    }
  },
  actions: {}
})
