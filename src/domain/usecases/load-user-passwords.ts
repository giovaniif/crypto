import { LoadUserPasswordsRepository } from '@/domain/contracts/repos'

export type LoadUserPasswords = (input: Input) => Output
type Setup = (loadUserPasswordsRepo: LoadUserPasswordsRepository) => LoadUserPasswords
type Input = { userId: string }
type Output = Promise<Array<{ password: string, userId: string, title: string, id: string }>>

export const setupLoadUserPasswords: Setup = (loadUserPasswordsRepo) => async ({ userId }) => await loadUserPasswordsRepo.loadUserPasswords({ userId })
