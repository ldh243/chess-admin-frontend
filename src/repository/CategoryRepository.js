import Repository from '@/repository/Repository'

const resource = '/category'

export default {
  getCategories() {
    return Repository.get(`${resource}/get-categories`)
  },
  getCategoryDetail(categoryId) {
    const data = {
      params: {
        categoryId: categoryId
      }
    }
    return Repository.get(`${resource}/get-by-id`, data)
  },
  createCategory(categoryId, name) {
    const data = {
      categoryId: categoryId,
      name: name
    }
    return Repository.post(`${resource}/create-category`, data)
  },
  updateCategory(categoryId, name) {
    const data = {
      categoryId: categoryId,
      name: name
    }
    return Repository.post(`${resource}/update-category`, data)
  },
  removeCategory(categoryId, name) {
    const data = {
      categoryId: categoryId,
      name: name
    }
    return Repository.put(`${resource}/remove-category`, data)
  }

  // bid(id, price) {
  //   const data = { bidId: id, price: price }
  //   return Repository.post(`${resource}`, data)
  // }

  // updateCourseStatus(courseId, statusId) {
  //   const data = {
  //     courseId: courseId,
  //     statusId: statusId
  //   }
  //   return Repository.put(
  //     `${resource}/update-course-status`,
  //     {},
  //     { params: data }
  //   )
  // }
}
