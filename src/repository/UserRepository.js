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
  },
  getCurrentUserDetail(){
    var user = localStorage.getItem('user');

    if(!user){
      var data = Repository.get(`${resource}/get-current-user-detail`)
      user = data.data.data
    }else{
      user = JSON.parse(user)
    }

    return user
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
  }
  // http://cols-be.ml/user/get-current-user-detail

  // bid(id, price) {
  //   const data = { bidId: id, price: price }
  //   return Repository.post(`${resource}`, data)
  // }
}
