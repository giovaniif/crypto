import { mock, MockProxy } from 'jest-mock-extended'

import { LoadUserPasswordsRepository } from '@/domain/contracts/repos'
import { LoadUserPasswords, setupLoadUserPasswords } from '@/domain/usecases'

describe('LoadUserPasswords', () => {
  let userId: string
  let loadUserPasswordsRepository: MockProxy<LoadUserPasswordsRepository>
  let sut: LoadUserPasswords

  beforeAll(() => {
    userId = 'any_user_id'
    loadUserPasswordsRepository = mock()
  })

  beforeEach(() => {
    sut = setupLoadUserPasswords(loadUserPasswordsRepository)
  })

  it('should call loadUserPasswordsRepository with correct id', async () => {
    await sut({ userId })

    expect(loadUserPasswordsRepository.loadUserPasswords).toHaveBeenCalledWith({ userId })
    expect(loadUserPasswordsRepository.loadUserPasswords).toHaveBeenCalledTimes(1)
  })

  it('should return same result as loadUserPasswordsRepository', async () => {
    const expected = [{ id: 'any_id', title: 'any_title', userId: 'any_user_id', password: 'any_password' }]
    loadUserPasswordsRepository.loadUserPasswords.mockResolvedValue(expected)

    const passwords = await sut({ userId })

    expect(passwords).toEqual(expected)
  })
})
