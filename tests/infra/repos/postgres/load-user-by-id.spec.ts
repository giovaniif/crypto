import { Entity, Column, PrimaryGeneratedColumn, getRepository, Repository, getConnection } from 'typeorm'
import { IBackup } from 'pg-mem'

import { LoadUserByIdRepository } from '@/domain/contracts/repos'
import { makeFakeDb } from './mocks'

export class PostgresLoadUserByIdRepository implements LoadUserByIdRepository {
  async loadById (input: LoadUserByIdRepository.Input): Promise<LoadUserByIdRepository.Output> {
    const userRepo = getRepository(PgUser)
    const user = await userRepo.findOne({ where: { id: Number(input.userId) } })
    if (user === undefined) return undefined

    return {
      id: user.id.toString(),
      userName: user.userName
    }
  }
}

@Entity('users')
export class PgUser {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  userName!: string
}

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
