import { PostgresLoadUserByIdRepository } from '@/infra/repos/postgres'

export const makePostgresLoadUserByIdRepository = (): PostgresLoadUserByIdRepository => new PostgresLoadUserByIdRepository()
