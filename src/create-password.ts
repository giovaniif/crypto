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
namespace EncryptPassword {
  export type Input = {
    password: string
  }
  export type Output = string
}
export interface EncryptPassword {
  encrypt: (input: EncryptPassword.Input) => EncryptPassword.Output
}

export type CreatePassword = (input: Input) => Output
type Setup = (encryptPassword: EncryptPassword, createPasswordRepo: CreatePasswordRepository) => CreatePassword
type Input = { password: string, userId: string, title: string }
type Output = Promise<void>

export const setupCreatePassword: Setup = (encryptPassword, createPasswordRepo) => {
  return async ({ password, title, userId }) => {
    const encryptedPassword = encryptPassword.encrypt({ password })
    await createPasswordRepo.createPassword({
      password: encryptedPassword,
      title,
      userId
    })
  }
}
