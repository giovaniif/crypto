import { LoadUserPasswords, setupLoadUserPasswords } from '@/domain/usecases'
import { makePostgresLoadUserPasswordsRepository } from '@/main/factories/repos'

export const makeLoadUserPasswords = (): LoadUserPasswords => setupLoadUserPasswords(makePostgresLoadUserPasswordsRepository())
