import Vue from 'vue'
import Index from './pages/Index'
import router from './router'
import store from './store'
import mixin from './mixin'
import './plugins/index'
Vue.config.productionTip = false

function getTokenFromHeader() {
  let url = new URL(window.location.href)
  let token = url.searchParams.get('token')

  if (token) {
    let originUri = url.origin + url.pathname
    history.pushState(null, '', originUri)
    localStorage.setItem('access-token', token)
  }
}

router.beforeEach((to, from, next) => {
  getTokenFromHeader()

  const publicPages = ['/']
  // const roleAccept = ['Instructor', 'Admin']

  // const user = localStorage.getItem('user')
  // let roleName = ''
  // if (user) {
  //   roleName = JSON.parse(localStorage.getItem('user')).roleName
  // }

  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('access-token') != null
  // const roleRequired = roleAccept.includes(roleName)

  // if ((authRequired && !loggedIn) || (authRequired && !roleRequired)) {
  if (authRequired && !loggedIn) {
    return next('/')
  } else if (to.path == '/' && loggedIn) {
    return next('/dashboard/profile')
  }
  next()
})

new Vue({
  router,
  store,
  mixin,
  render: h => h(Index)
}).$mount('#app')
