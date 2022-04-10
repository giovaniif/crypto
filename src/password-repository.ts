namespace CreatePasswordRepository {
  export type Input = {
    password: string
    title: string
    userId: string
  }
  export type Output = {
    password: string
    title: string
    userId: string
  }
}

export interface CreatePasswordRepository {
  createPassword: (input: CreatePasswordRepository.Input) => Promise<CreatePasswordRepository.Output>
}
