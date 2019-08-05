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
    return Repository.get(`${resource}/get-by-id`,data)
  },
  updateUninteractiveLesson(data){
    return Repository.put(`${resource}/update-uninteractive-lesson`,data)
  },
  removeLesson(lessonId) {
    const data = {
      lessonId: lessonId
    }
    return Repository.put(`${resource}/remove-lesson`, data)
  }
}
