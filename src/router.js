import Vue from 'vue'
import Router from 'vue-router'

//page
import Login from '@/pages/Login'
import Dashboard from '@/pages/Dashboard.vue'

//layout
import Profile from '@/layouts/dashboard/Profile'
import Statistics from '@/layouts/dashboard/Statistics'
import Courses from '@/layouts/dashboard/Courses'
import UserManagement from '@/layouts/dashboard/UserManagement'
Vue.use(Router)
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', component: Login },
    {
      path: '/dashboard',
      component: Dashboard,
      children: [
        { path: 'profile', component: Profile },
        { path: 'statistics', component: Statistics },
        { path: 'courses', component: Courses },
        { path: 'accounts', component: UserManagement }
      ]
    },
    { path: '*', redirect: '/' }
  ]
})
