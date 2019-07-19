import Repository from '@/repository/Repository'

const resource = '/user'

export default {
  getUsersPagination(page, pageSize) {
    const data = { params: { page: page, pageSize: pageSize } }
    return Repository.get(`${resource}/get-users-pagination`, data)
  },
  // Get List Instructor
  getUsersRequestInstructor(page, pageSize, isActive, role) {
    const data = {
      params: {
        page: page,
        pageSize: pageSize,
        isActive: isActive,
        role: role
      }
    }
    return Repository.get(`${resource}/get-users-pagination`, data)
  },
  getUsersById(userId) {
    const data = {
      params: {
        userId: userId
      }
    }
    return Repository.get(`${resource}/get-by-id`, data)
  },
  updateStatus(data) {
    return Repository.put(`${resource}/update-status`, data)
  }

  // http://cols-be.ml/user/get-current-user-detail

  // bid(id, price) {
  //   const data = { bidId: id, price: price }
  //   return Repository.post(`${resource}`, data)
  // }
}
