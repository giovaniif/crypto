import { IBackup } from 'pg-mem'
import { Repository, getRepository, getConnection } from 'typeorm'
import request from 'supertest'

import { app } from '@/main/config/app'
import { makeFakeDb } from '@/tests/infra/repos/postgres/mocks'
import { PgUser } from '@/infra/entities/postgres'

describe('Password Routes', () => {
  describe('POST /passwords', () => {
    let backup: IBackup
    let pgUserRepo: Repository<PgUser>

    beforeAll(async () => {
      const db = await makeFakeDb()
      backup = db.backup()
      pgUserRepo = getRepository(PgUser)
    })

    beforeEach(() => {
      backup.restore()
    })

    afterAll(async () => {
      await getConnection().close()
    })

    it('should return 201', async () => {
      const { id } = await pgUserRepo.save({ userName: 'any_name' })

      const { status, body } = await request(app)
        .post('/passwords')
        .send({ userId: id, password: 'any_password', title: 'any_title' })

      expect(status).toBe(201)
      expect(body).toEqual({ id: expect.any(String), userId: id, title: 'any_title', password: expect.any(String) })
    })
  })
})
