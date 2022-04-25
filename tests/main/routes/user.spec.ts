import { IBackup } from 'pg-mem'
import { Repository, getRepository, getConnection } from 'typeorm'
import request from 'supertest'

import { app } from '@/main/config/app'
import { makeFakeDb } from '@/tests/infra/repos/postgres/mocks'
import { PgPassword, PgUser } from '@/infra/entities/postgres'

describe('User Routes', () => {
  describe('GET /users/:userId/passwords', () => {
    let backup: IBackup
    let pgUserRepo: Repository<PgUser>
    let pgPasswordRepo: Repository<PgPassword>

    beforeAll(async () => {
      const db = await makeFakeDb()
      backup = db.backup()
      pgUserRepo = getRepository(PgUser)
      pgPasswordRepo = getRepository(PgPassword)
    })

    beforeEach(() => {
      backup.restore()
    })

    afterAll(async () => {
      await getConnection().close()
    })

    it('should return 200', async () => {
      const { id } = await pgUserRepo.save({ userName: 'any_name' })
      await pgPasswordRepo.save({ password: 'any_password', title: 'any_title', userId: id.toString() })

      const { status, body } = await request(app)
        .get(`/users/${id}/passwords`)

      expect(status).toBe(200)
      expect(body).toEqual([{ id: expect.any(String), userId: id.toString(), title: 'any_title', password: expect.any(String) }])
    })
  })
})
