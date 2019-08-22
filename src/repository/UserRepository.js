import Repository from '@/repository/Repository'

const resource = '/user'

export default {
  getUsersPagination(page, pageSize,email,isActive,isReview,role) {
    const data = { 
      params: { 
        page: page, 
        pageSize: pageSize,
        email: email ? email : '',
        isActive: isActive ? isActive : '',
        isReview: isReview ? isReview : '',
        role: role ? role : ''
      } }
    return Repository.get(`${resource}/get-users-pagination`, data)
  },
  updateStatus(data) {
    return Repository.put(`${resource}/update-status`, data)
  },
  getCurrentUserDetail() {
    return Repository.get(`${resource}/get-current-user-detail`)
  },
  getUserById(userId){
    const data = {
      params:{
        userId: userId
      }
    }
    return Repository.get(`${resource}/get-by-id`, data)
  },
  updateUserStatus(userId,isActive){
    const data = {
      active: isActive,
      userId: userId
    }
    return Repository.put(`${resource}/update-status`, data)
  },
  updateProfile(data) {
    return Repository.put(`${resource}/update-profile`, data)
  },
  // http://cols-be.ml/user/get-current-user-detail

  // bid(id, price) {
  //   const data = { bidId: id, price: price }
  //   return Repository.post(`${resource}`, data)
  // }
}
