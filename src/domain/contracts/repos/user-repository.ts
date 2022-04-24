export namespace LoadUserByIdRepository {
  export type Input = { userId: string }
  export type Output = { id: string, userName: string } | undefined
}

export interface LoadUserByIdRepository {
  loadById: (input: LoadUserByIdRepository.Input) => Promise<LoadUserByIdRepository.Output>
}
