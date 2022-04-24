import { getRepository } from 'typeorm'

import { LoadUserByIdRepository } from '@/domain/contracts/repos'
import { PgUser } from '@/infra/entities/postgres'

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
