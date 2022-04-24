import { CreatePasswordController } from '@/application/controllers'
import { makeCreatePassword } from '@/main/factories/usecases'

export const makeCreatePasswordController = (): CreatePasswordController => new CreatePasswordController(makeCreatePassword())
