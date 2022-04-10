namespace CreatePasswordRepository {
  export type Input = {
    password: string
    title: string
    userId: string
  }
}

export interface CreatePasswordRepository {
  createPassword: (input: CreatePasswordRepository.Input) => Promise<void>
}

export type CreatePassword = (input: Input) => Output
type Setup = (createPasswordRepository: CreatePasswordRepository) => CreatePassword
type Input = { password: string, title: string, userId: string }
type Output = Promise<void>

export const setupCreatePassword: Setup = (createPasswordRepository) => {
  return async ({ password, title, userId }) => {
    await createPasswordRepository.createPassword({ password, title, userId })
  }
}
