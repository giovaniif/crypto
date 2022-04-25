import { getRepository } from 'typeorm'

import { LoadUserPasswordsRepository } from '@/domain/contracts/repos'
import { PgPassword } from '@/infra/entities/postgres'

export class PostgresLoadUserPasswordsRepository implements LoadUserPasswordsRepository {
  async loadUserPasswords ({ userId }: LoadUserPasswordsRepository.Input): Promise<LoadUserPasswordsRepository.Output> {
    const passwordRepo = getRepository(PgPassword)
    const passwords = await passwordRepo.find({ where: { userId: Number(userId) } })
    return passwords.map(password => ({
      ...password,
      userId: String(password.userId),
      id: String(password.id)
    }))
  }
}
