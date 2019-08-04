import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    api: {
      //user
      login: 'http://cols-be.ml/oauth2/authorize/google',
      getCurrentUserDetail: 'http://cols-be.ml/user/get-current-user-detail',
      updateUserStatus: 'http://cols-be.ml/user/update-status'
    },
    role: {
      instructor: '1',
      learner: '2',
      admin: '3',
      registrator: '4'
    },
    user: JSON.parse(localStorage.getItem('user')),
    currentLessonList: [],
    unreadNotifications: sessionStorage.getItem('unread-notification-counter') ? sessionStorage.getItem('unread-notification-counter') : 0,
    notificationUpdatedId:0
  },
  mutations: {
    changeUser(state, payload) {
      state.user = payload
    },
    changeUnreadNotifications(state,unreadNotifications){
      state.unreadNotifications = unreadNotifications
    },
    changeNotificationUpdatedId(state,notificationUpdatedId){
      state.notificationUpdatedId = notificationUpdatedId
    }
  },
  actions: {}
})
