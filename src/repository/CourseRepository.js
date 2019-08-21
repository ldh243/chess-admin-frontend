import Repository from '@/repository/Repository'
import router from '../router'

const resource = '/course'

export default {
  getCoursesPagination(page, pageSize) {
    const data = {
      params: {
        page: page,
        pageSize: pageSize
      }
    }

    return Repository.get(`${resource}/get-course-pagination`, data)
  },
  getById(courseId) {
    const data = {
      params: {
        courseId: courseId
      }
    }
    return Repository.get(`${resource}/get-by-id`, data)
  },
  getCourseByCategoryId(categoryId, page, pageSize) {
    const data = {
      params: {
        categoryId: categoryId,
        page: page,
        pageSize: pageSize
      }
    }
    return Repository.get(
      `${resource}/get-course-paginations-by-category-id`,
      data
    )
  },
  createCourse(data) {
    return Repository.post(`${resource}/create-course`, data)
  },
  updateCourse(data) {
    return Repository.put(`${resource}/update-course`, data)
  },
  removeCourse(courseId) {
    const data = {
      courseId: courseId
    }
    return Repository.put(`${resource}/remove-course`, data)
  },

  updateCourseStatus(courseId, statusId) {
    const data = {
      courseId: courseId,
      statusId: statusId
    }
    return Repository.put(`${resource}/update-course-status`, data)
  },
  getCoursesPagination(page, pageSize,nameCourse,statusId) {
    const data = {
      params: {
        page: page,
        pageSize: pageSize,
        nameCourse: nameCourse ? nameCourse : '',
        statusId: statusId ? statusId : ''
      }
    }
    return Repository.get(
      `${resource}/get-course-pagination`,
      data
    )
  },
  getCoursesPaginationByUserId(page, pageSize,nameCourse,statusId,userId) {
    const data = {
      params: {
        page: page,
        pageSize: pageSize,
        nameCourse: nameCourse ? nameCourse : '',
        statusId: statusId ? statusId : '',
        userId: userId
      }
    }
    return Repository.get(
      `${resource}/get-course-paginations-by-userid`,
      data
    )
  },
  publishCourse(courseId) {
    const data = {
      courseId: courseId
    }
    return Repository.put(`${resource}/publish-course`, data)
  },
  updateCourseStatus(courseId,reasonReject,statusId){
    const data = {
      courseId: courseId,
      reasonReject: reasonReject,
      statusId: statusId
    }
    return Repository.put(`${resource}/update-course-status`, data)
  },
  changeStatusCourseToDrafting(courseId){
    const data = {
      courseId: courseId
    }
    return Repository.put(`${resource}/change-status-to-drafting`, data)
  }
}
