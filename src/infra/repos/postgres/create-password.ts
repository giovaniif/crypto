import { getRepository } from 'typeorm'

import { CreatePasswordRepository } from '@/domain/contracts/repos'
import { PgPassword } from '@/infra/entities/postgres'

export class PostgresCreatePasswordRepository implements CreatePasswordRepository {
  async createPassword (input: CreatePasswordRepository.Input): Promise<CreatePasswordRepository.Output> {
    const repo = getRepository(PgPassword)
    const password = repo.create(input)
    await repo.save(password)
    return password
  }
}
