import UserRepository from '@/repository/UserRepository'
import CourseRepository from '@/repository/CourseRepository'
import CategoryRepository from '@/repository/CategoryRepository'
import LessonRepository from '@/repository/LessonRepository'

const repositories = {
  user: UserRepository,
  course: CourseRepository,
  category: CategoryRepository,
  lesson: LessonRepository
}

export const RepositoryFactory = {
  get: name => repositories[name]
}
