import { getConnection } from 'typeorm'
import { IBackup } from 'pg-mem'

import { PgPassword } from '@/infra/entities/postgres'
import { PostgresCreatePasswordRepository } from '@/infra/repos/postgres'

import { makeFakeDb } from './mocks'

describe('PostgresCreatePassswordRepository', () => {
  let backup: IBackup

  beforeAll(async () => {
    const db = await makeFakeDb([PgPassword])
    backup = db.backup()
  })

  beforeEach(() => {
    backup.restore()
  })

  afterAll(async () => {
    await getConnection().close()
  })

  it('should create and return the password', async () => {
    const sut = new PostgresCreatePasswordRepository()
    const password = await sut.createPassword({
      password: 'password',
      userId: 'userId',
      title: 'title'
    })

    expect(password).toEqual({
      password: 'password',
      userId: 'userId',
      title: 'title',
      id: expect.anything()
    })
  })
})
