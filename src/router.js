import CourseManagement from '@/layouts/dashboard/CourseManagement'
//layout
import Profile from '@/layouts/dashboard/Profile'
import Statistics from '@/layouts/dashboard/Statistics'
import UserManagement from '@/layouts/dashboard/UserManagement'
import CategoryManagement from '@/layouts/dashboard/CategoryManagement'
import NewInstructorManagement from '@/layouts/dashboard/NewInstructorManagement'
import NewInstructor from '@/layouts/instructor/NewInstructor'
import CourseDetailByInstructor from '@/layouts/dashboard/CourseDetailByInstructor'
import Dashboard from '@/pages/Dashboard.vue'
//page
import Login from '@/pages/Login'
import Vue from 'vue'
import Router from 'vue-router'

//instructor
import CreateCourse from '@/components/Instructor/CreateCourse'
import DetailCourseById from '@/components/Instructor/DetailCourseById'

//notification
import Notification from '@/layouts/dashboard/Notification'
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
        {
          path: 'createcourse',
          component: CreateCourse
        },
        { path: 'profile', component: Profile },
        { path: 'statistics', component: Statistics },
        { path: 'courses', component: CourseManagement },
        { path: 'courses?:courseName=&:status', component: CourseManagement },
        { path: 'courses?:courseName=', component: CourseManagement },
        { path: 'courses/:courseId', component: DetailCourseById},
        { path: 'accounts', component: UserManagement },
        { path: 'category', component: CategoryManagement },
        { path: 'instructor-request', component: NewInstructorManagement },
        { path: 'instructor-request?:email', component: NewInstructorManagement },
        { path: 'instructorCourse', component: CourseDetailByInstructor },
        { path: 'new-ins-profile/:userId', component: NewInstructor},
        { path: 'notifications', component: Notification}
      ]
    },
    { path: '*', redirect: '/' }
  ]
})
