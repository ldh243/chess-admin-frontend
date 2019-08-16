import Vue from 'vue'
import Router from 'vue-router'
//import page
import Login from '@/pages/Login'
import Dashboard from '@/pages/Dashboard'
//import components
import Profile from '@/components/profile/Profile'
import Statistics from '@/components/statistics/Statistics'
import CourseManagement from '@/components/courses/CourseManagement'
import UserManagement from '@/components/users/UserManagement'
import CategoryManagement from '@/components/category/CategoryManagement'
import NewInstructorManagement from '@/components/instructor/NewInstructorManagement'
import CourseDetailByInstructor from '@/components/instructor/CourseDetailByInstructor'
import NewInstructor from '@/components/instructor/NewInstructor'
import CreateCourse from '@/components/courses/CreateCourse'
import DetailCourseById from '@/components/courses/courseComponents/DetailCourseById'
import Notification from '@/components/notifications/Notification'

Vue.use(Router)
export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {path: '/', component: Login},
        {
            path: '/dashboard',
            component: Dashboard,
            children: [
                { path: 'profile', component: Profile},
                { path: 'statistics', component: Statistics},
                { path: 'courses', component: CourseManagement},
                { path: 'courses?:courseName=&:status', component: CourseManagement },
                { path: 'courses?:courseName=', component: CourseManagement },
                { path: 'courses/:courseId', component: DetailCourseById},
                { path: 'accounts', component: UserManagement},
                { path: 'category', component: CategoryManagement },
                { path: 'instructor-request', component: NewInstructorManagement},
                { path: 'instructor-request?:email', component: NewInstructorManagement },
                { path: 'instructorCourse', component: CourseDetailByInstructor },
                { path: 'new-ins-profile/:userId', component: NewInstructor},
                { path: 'notifications', component: Notification},
                { path: 'create-course', component: CreateCourse }
            ]
        },
        { path: '*', redirect: '/'}
    ]
})