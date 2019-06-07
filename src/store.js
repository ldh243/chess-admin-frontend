import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    api: {
      login:
        'http://chess-env.zgqmvp9n3m.ap-southeast-1.elasticbeanstalk.com/oauth2/authorize/google',
      getCurrentUserDetail: 'http://cols-be.ml/user/get-current-user-detail',
      getUsersPagination: 'http://cols-be.ml/user/get-users-pagination'
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
