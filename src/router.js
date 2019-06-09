import CourseManagement from '@/layouts/dashboard/CourseManagement'
//layout
import Profile from '@/layouts/dashboard/Profile'
import Statistics from '@/layouts/dashboard/Statistics'
import UserManagement from '@/layouts/dashboard/UserManagement'
import Dashboard from '@/pages/Dashboard.vue'
//page
import Login from '@/pages/Login'
import Vue from 'vue'
import Router from 'vue-router'

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
        { path: 'courses', component: CourseManagement },
        { path: 'accounts', component: UserManagement }
      ]
    },
    { path: '*', redirect: '/' }
  ]
})
