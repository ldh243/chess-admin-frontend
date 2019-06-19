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

    return Repository.get(`${resource}/get-category-detail-by-id`, data)
  }
}
