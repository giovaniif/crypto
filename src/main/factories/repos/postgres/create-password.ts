import { PostgresCreatePasswordRepository } from '@/infra/repos/postgres'

export const makePostgresCreatePasswordRepository = (): PostgresCreatePasswordRepository => new PostgresCreatePasswordRepository()
