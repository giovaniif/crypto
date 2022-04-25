import { PostgresLoadUserPasswordsRepository } from '@/infra/repos/postgres'

export const makePostgresLoadUserPasswordsRepository = (): PostgresLoadUserPasswordsRepository => new PostgresLoadUserPasswordsRepository()
