import { getRepository, Repository, getConnection } from 'typeorm'
import { IBackup } from 'pg-mem'

import { makeFakeDb } from './mocks'
import { PgUser } from '@/infra/entities/postgres'
import { PostgresLoadUserByIdRepository } from '@/infra/repos/postgres'

describe('PostgresLoadUserByIdRepository', () => {
  let pgUserRepo: Repository<PgUser>
  let backup: IBackup
  let sut: PostgresLoadUserByIdRepository

  beforeAll(async () => {
    const db = await makeFakeDb([PgUser])
    backup = db.backup()
    pgUserRepo = getRepository(PgUser)
  })

  beforeEach(() => {
    backup.restore()
    sut = new PostgresLoadUserByIdRepository()
  })

  afterAll(async () => {
    await getConnection().close()
  })

  it('should return undefined if user is not found', async () => {
    const result = await sut.loadById({ userId: '1' })

    expect(result).toEqual(undefined)
  })

  it('should return user if user is found', async () => {
    const { id: userId } = await pgUserRepo.save({ userName: 'any_name' })

    const result = await sut.loadById({ userId: userId.toString() })

    expect(result).toEqual({ id: userId.toString(), userName: 'any_name' })
  })
})
