import Repository from '@/repository/Repository'

const resource = '/lesson'

export default {
  createInteractiveLesson(data) {
    return Repository.post(`${resource}/create-interactive-lesson`, data)
  },
  createUninteractiveLesson(data){
    return Repository.post(`${resource}/create-uninteractive-lesson`,data)
  },
  getById(lessonId){
    const data = {
      params: {
        lessonId: lessonId
      }
    }
<<<<<<< HEAD
    return Repository.get(`${resource}/get-by-id`,data)
  },
  updateUninteractiveLesson(data){
    return Repository.put(`${resource}/update-uninteractive-lesson`,data)
  },
  updateInteractiveLesson(data) {
    return Repository.put(`${resource}/update-interactive-lesson`, data)
  },
  removeLesson(lessonId) {
    const data = {
      lessonId: lessonId
    }
    return Repository.put(`${resource}/remove-lesson`, data)
=======
    return Repository.get(`${resource}/get-by-id`, data)
  },
  createInteractiveLesson(lessonViewModel) {
    const data = lessonViewModel
    return Repository.post(`${resource}/create-interactive-lesson`, data)
>>>>>>> 213ddd884bc54c7baed038a947b94fe079bfe66c
  }
}
