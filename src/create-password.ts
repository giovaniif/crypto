import { Encrypt } from './encrypt'
import { CreatePasswordRepository } from './password-repository'

export type CreatePassword = (input: Input) => Output
type Setup = (encryptPassword: Encrypt, createPasswordRepo: CreatePasswordRepository) => CreatePassword
type Input = { password: string, userId: string, title: string }
type Output = Promise<{ password: string, userId: string, title: string }>

export const setupCreatePassword: Setup = (encryptPassword, createPasswordRepo) => {
  return async ({ password, title, userId }) => {
    const encryptedPassword = encryptPassword.encrypt({ password })
    return createPasswordRepo.createPassword({
      password: encryptedPassword,
      title,
      userId
    })
  }
}
