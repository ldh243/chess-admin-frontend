import Repository from '@/repository/Repository'

const resource = '/lesson'

export default {
  createInteractiveLesson(lessonViewModel) {
    const data = lessonViewModel
    return Repository.post(`${resource}/create-interactive-lesson`, data)
  }
}
