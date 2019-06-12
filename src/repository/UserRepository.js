import Repository from '@/repository/Repository'

const resource = '/user'

export default {
  // getAllBidding() {
  //   return Repository.get(`${resource}`)
  // },
  getUsersPagination(page, pageSize) {
    const data = { params: { page: page, pageSize: pageSize } }
    return Repository.get(`${resource}/get-users-pagination`, data)
  }
  // bid(id, price) {
  //   const data = { bidId: id, price: price }
  //   return Repository.post(`${resource}`, data)
  // }
}
