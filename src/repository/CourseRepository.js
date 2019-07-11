import Repository from '@/repository/Repository'

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
  createCourse(name, description, image, point, listCategoryIds) {
    const data = {
      name: name,
      description: description,
      image: image,
      point: point,
      listCategoryIds: listCategoryIds
    }
    return Repository.post(`${resource}/create-course`, data)
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

  getCoursesPaginationCurrentInstructor(page, pageSize) {
    const data = {
      params: {
        page: page,
        pageSize: pageSize
      }
    }
    return Repository.get(
      `${resource}/get-course-paginations-current-instructor`,
      data
    )
  }
}
