import UserRepository from '@/repository/UserRepository'
import CourseRepository from '@/repository/CourseRepository'
import CategoryRepository from '@/repository/CategoryRepository'

const repositories = {
  user: UserRepository,
  course: CourseRepository,
  category: CategoryRepository
}

export const RepositoryFactory = {
  get: name => repositories[name]
}
