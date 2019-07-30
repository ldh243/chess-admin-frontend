import Repository from '@/repository/Repository'

const resource = '/lesson'

export default {
  createInteractiveLesson(
    courseId,
    name,
    interactiveLesson,
    initCode,
    interactiveLessonid
  ) {
    const data = {
      name: name
    }
    // return Repository.post(`${resource}/create-course`, data)
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
  updateUninteractiveLesson(lessonId,name,uninteractiveLesson){
    const data = {
      lessonId: lessonId,
      name : name,
      uninteractiveLesson : uninteractiveLesson
    }
    return Repository.put(`${resource}/update-uninteractive-lesson`,data)
  }
}
