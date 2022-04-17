import { mock, MockProxy } from 'jest-mock-extended'

import { setupCreatePassword, CreatePassword } from '../src/create-password'
import { CryptoService } from '../src/crypto'
import { CreatePasswordRepository } from '../src/password-repository'
import { LoadUserByIdRepository } from '../src/user-repository'

describe('Create Password Usecase', () => {
  let encryptPassword: MockProxy<CryptoService>
  let sut: CreatePassword
  let password: string
  let encryptedPassword: string
  let userId: string
  let title: string
  let createPasswordRepo: MockProxy<CreatePasswordRepository>
  let loadUserByIdRepo: MockProxy<LoadUserByIdRepository>

  beforeAll(() => {
    encryptedPassword = 'encryptedPassword'
    encryptPassword = mock()
    encryptPassword.encrypt.mockReturnValue(encryptedPassword)
    password = 'password'
    userId = 'userId'
    title = 'title'
    createPasswordRepo = mock()
    createPasswordRepo.createPassword.mockResolvedValue({
      password: encryptedPassword,
      title,
      userId
    })
    loadUserByIdRepo = mock()
  })

  beforeEach(() => {
    sut = setupCreatePassword(encryptPassword, createPasswordRepo, loadUserByIdRepo)
  })

  it('should call loadUserByIdRepository with correct user id', async () => {
    await sut({ password, title, userId })

    expect(loadUserByIdRepo.loadById).toHaveBeenCalledWith({
      userId
    })
  })

  it('should call encryptPassword with correct password', async () => {
    await sut({ password, title, userId })

    expect(encryptPassword.encrypt).toHaveBeenCalledWith({
      text: password
    })
    expect(encryptPassword.encrypt).toHaveBeenCalledTimes(1)
  })

  it('should call createPassword with encrypted password, title and userId', async () => {
    await sut({ password, title, userId })

    expect(createPasswordRepo.createPassword).toHaveBeenCalledWith({
      password: encryptedPassword,
      title,
      userId
    })
    expect(createPasswordRepo.createPassword).toHaveBeenCalledTimes(1)
  })

  it('should return the create password', async () => {
    const result = await sut({ password, title, userId })

    expect(result).toEqual({
      password: encryptedPassword,
      title,
      userId
    })
  })
})
