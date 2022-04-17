import { CryptoService } from '@/crypto'
import { CreatePasswordRepository } from '@/password-repository'
import { UserNotFoundError } from '@/user-not-found'
import { LoadUserByIdRepository } from '@/user-repository'

export type CreatePassword = (input: Input) => Output
type Setup = (encryptPassword: CryptoService, createPasswordRepo: CreatePasswordRepository, loadUserByIdRepo: LoadUserByIdRepository) => CreatePassword
type Input = { password: string, userId: string, title: string }
type Output = Promise<{ password: string, userId: string, title: string }>

export const setupCreatePassword: Setup = (encryptPassword, createPasswordRepo, loadUserByIdRepo) => {
  return async ({ password, title, userId }) => {
    const user = await loadUserByIdRepo.loadById({ userId })
    if (user === undefined) throw new UserNotFoundError()
    const encryptedPassword = encryptPassword.encrypt({ text: password })
    return createPasswordRepo.createPassword({
      password: encryptedPassword,
      title,
      userId
    })
  }
}
