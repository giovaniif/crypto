import { getConnection, getRepository } from 'typeorm'
import { IBackup } from 'pg-mem'

import { PgPassword } from '@/infra/entities/postgres'
import { PostgresLoadUserPasswordsRepository } from '@/infra/repos/postgres'

import { makeFakeDb } from './mocks'

describe('PostgresLoadUserPasswordsRepository', () => {
  let backup: IBackup
  let sut: PostgresLoadUserPasswordsRepository

  beforeAll(async () => {
    const db = await makeFakeDb([PgPassword])
    backup = db.backup()
  })

  beforeEach(() => {
    backup.restore()
    sut = new PostgresLoadUserPasswordsRepository()
  })

  afterAll(async () => {
    await getConnection().close()
  })

  it('should return an empty array if user has no passwords', async () => {
    const result = await sut.loadUserPasswords({ userId: 'any_user_id' })

    expect(result).toEqual([])
  })

  it('should return an array of passwords if user has passwords', async () => {
    const userId = '1'
    const password = 'any_password'
    const title = 'any_title'
    const passwordRepo = getRepository(PgPassword)
    await passwordRepo.save({
      password,
      title,
      userId
    })

    const result = await sut.loadUserPasswords({ userId })

    expect(result).toEqual([{ id: expect.any(String), title, userId, password }])
  })
})
