import UserRepository from '@/repository/UserRepository'

const repositories = {
  user: UserRepository
}

export const RepositoryFactory = {
  get: name => repositories[name]
}
