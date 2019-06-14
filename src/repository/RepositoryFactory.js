import UserRepository from '@/repository/UserRepository'
import CourseRepository from '@/repository/CourseRepository'

const repositories = {
  user: UserRepository,
  course: CourseRepository
}

export const RepositoryFactory = {
  get: name => repositories[name]
}
