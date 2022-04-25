import { LoadUserPasswordsController } from '@/application/controllers'
import { makeLoadUserPasswords } from '@/main/factories/usecases'

export const makeLoadUserPasswordsController = (): LoadUserPasswordsController => new LoadUserPasswordsController(makeLoadUserPasswords())
