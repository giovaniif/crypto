import { User } from '@/domain/entities'

export namespace LoadUserByIdRepository {
  export type Input = { userId: string }
  export type Output = Promise<User> | undefined
}

export interface LoadUserByIdRepository {
  loadById: (input: LoadUserByIdRepository.Input) => LoadUserByIdRepository.Output
}
