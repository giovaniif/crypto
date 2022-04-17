import { User } from './user'

namespace LoadUserByIdRepository {
  export type Input = { userId: string }
  export type Output = Promise<User>
}

export interface LoadUserByIdRepository {
  loadById: (input: LoadUserByIdRepository.Input) => LoadUserByIdRepository.Output
}
