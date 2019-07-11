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
  }
}
