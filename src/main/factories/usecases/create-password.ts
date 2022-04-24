import { CreatePassword, setupCreatePassword } from '@/domain/usecases'
import { makePostgresCreatePasswordRepository, makePostgresLoadUserByIdRepository } from '@/main/factories/repos'
import { makeTdeaEncryptionService } from '@/main/factories/services'

export const makeCreatePassword = (): CreatePassword => setupCreatePassword(makeTdeaEncryptionService(), makePostgresCreatePasswordRepository(), makePostgresLoadUserByIdRepository())
