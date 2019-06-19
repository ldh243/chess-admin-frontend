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
  updateCourseStatus(courseId, statusId) {
    const data = {
      courseId: courseId,
      statusId: statusId
    }
    return Repository.put(
      `${resource}/update-course-status`,
      {},
      { params: data }
    )
  },
  getCategories() {
    return Repository.get(`${resource}/get-categories`)
  },
  getCategoryDetail(categoryId) {
    const data = {
      params: {
        categoryId: categoryId
      }
    }

    return Repository.get(`${resource}/get-category-detail-by-id`, data)
  }
}
