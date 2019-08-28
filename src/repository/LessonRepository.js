import Repository from '@/repository/Repository'

const resource = '/lessons'

export default {
  createExercise(data) {
    return Repository.post(`${resource}/exercise-lesson`, data)
  },
  createInteractiveLesson(data) {
    return Repository.post(`${resource}/interactive-lesson`, data)
  },
  createUninteractiveLesson(data){
    return Repository.post(`${resource}/uninteractive-lesson`,data)
  },
  getById(lessonId){
    return Repository.get(`${resource}/`+lessonId)
  },
  updateUninteractiveLesson(data){
    return Repository.put(`${resource}/uninteractive-lesson`,data)
  },
  updateInteractiveLesson(data) {
    return Repository.put(`${resource}/interactive-lesson`, data)
  },
  removeLesson(lessonId) {
    const data = {
      lessonId: lessonId
    }
    return Repository.delete(`${resource}/`+lessonId)
  }
}
