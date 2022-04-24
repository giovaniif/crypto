import { LoadUserByIdRepository } from '@/domain/contracts/repos'

export class PostgresLoadUserByIdRepository implements LoadUserByIdRepository {
  loadById (input: LoadUserByIdRepository.Input): LoadUserByIdRepository.Output {
    return undefined
  }
}

describe('PostgresLoadUserByIdRepository', () => {
  it('should return undefined if user is not found', async () => {
    const sut = new PostgresLoadUserByIdRepository()

    const result = await sut.loadById({ userId: 'userId' })

    expect(result).toEqual(undefined)
  })
})
