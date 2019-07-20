import Repository from '@/repository/Repository'

const resource = '/user'

export default {
  getUsersPagination(page, pageSize) {
    const data = { params: { page: page, pageSize: pageSize } }
    return Repository.get(`${resource}/get-users-pagination`, data)
  },
  getCurrentUserDetail(){
      var user = localStorage.getItem('user');

      if(!user){
        user = Repository.get(`${resource}/get-current-user-detail`)
      }else{
        user = JSON.parse(user)
      }

      return user
  }
  // http://cols-be.ml/user/get-current-user-detail

  // bid(id, price) {
  //   const data = { bidId: id, price: price }
  //   return Repository.post(`${resource}`, data)
  // }
}
