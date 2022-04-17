import { CryptoService } from './crypto'
import { CreatePasswordRepository } from './password-repository'
import { LoadUserByIdRepository } from './user-repository'

export type CreatePassword = (input: Input) => Output
type Setup = (encryptPassword: CryptoService, createPasswordRepo: CreatePasswordRepository, loadUserByIdRepo: LoadUserByIdRepository) => CreatePassword
type Input = { password: string, userId: string, title: string }
type Output = Promise<{ password: string, userId: string, title: string }>

export const setupCreatePassword: Setup = (encryptPassword, createPasswordRepo, loadUserByIdRepo) => {
  return async ({ password, title, userId }) => {
    await loadUserByIdRepo.loadById({ userId })
    const encryptedPassword = encryptPassword.encrypt({ text: password })
    return createPasswordRepo.createPassword({
      password: encryptedPassword,
      title,
      userId
    })
  }
}
