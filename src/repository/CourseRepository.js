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
    return Repository.post(`${resource}/create-course`, data).then(res => {
      const courseId = res.data.data.savedId
      router.push({path: `/dashboard/instructorCourse/${courseId}`})
    })
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
  }
}
