import Vue from 'vue'
import Index from './pages/Index'
import router from './router'
import store from './store'
import mixin from './mixin'
import './plugins/index'
Vue.config.productionTip = false

function getParamsFromHeader() {
  const url = new URL(window.location.href)
  const token = url.searchParams.get('token')
  const role = url.searchParams.get('role')
  if (token && role) {
    const originUri = url.origin + url.pathname
    history.pushState(null, '', originUri)
    localStorage.setItem('access-token', token)
    localStorage.setItem('role', role)
  }
}

router.beforeEach((to, from, next) => {
  getParamsFromHeader()

  const publicPages = ['/']
  const roleAccepted = [1, 3]

  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('access-token') != null
  let role = ''
  if (localStorage.getItem('user') != null) {
    role = JSON.parse(localStorage.getItem('user')).roleId
  } else {
    role = parseInt(localStorage.getItem('role'))
  }
  const roleRequired = roleAccepted.includes(role)

  // if ((authRequired && !loggedIn) || (authRequired && !roleRequired)) {

  if (authRequired && (!loggedIn || !roleRequired)) {
    return next('/') //chua login -> ve trang login
  } else if (!authRequired && loggedIn && roleRequired) {
    return next('/dashboard/profile') //login roi, nhung vao lai login -> qua dashboard
  } else if (loggedIn && !roleRequired) {
    localStorage.removeItem('access-token')
    localStorage.removeItem('role')
    return next('/')
  }

  next()
})

new Vue({
  router,
  store,
  mixin,
  render: h => h(Index)
}).$mount('#app')
