export namespace CreatePasswordRepository {
  export type Input = {
    password: string
    title: string
    userId: string
  }
  export type Output = {
    password: string
    title: string
    userId: string
    id: string
  }
}

export interface CreatePasswordRepository {
  createPassword: (input: CreatePasswordRepository.Input) => Promise<CreatePasswordRepository.Output>
}

export namespace LoadUserPasswordsRepository {
  export type Input = {
    userId: string
  }
  export type Output =
    Array<{ id: string, title: string, userId: string, password: string }>

}

export interface LoadUserPasswordsRepository {
  loadUserPasswords: (input: LoadUserPasswordsRepository.Input) => Promise<LoadUserPasswordsRepository.Output>
}
