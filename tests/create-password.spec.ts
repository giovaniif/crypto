import { mock, MockProxy } from 'jest-mock-extended'

import { setupCreatePassword, CreatePassword } from '../src/create-password'
import { Encrypt } from '../src/encrypt'
import { CreatePasswordRepository } from '../src/password-repository'

describe('Create Password Usecase', () => {
  let encryptPassword: MockProxy<Encrypt>
  let sut: CreatePassword
  let password: string
  let encryptedPassword: string
  let userId: string
  let title: string
  let createPasswordRepo: MockProxy<CreatePasswordRepository>

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
  })

  beforeEach(() => {
    sut = setupCreatePassword(encryptPassword, createPasswordRepo)
  })

  it('should call encryptPassword with correct password', async () => {
    await sut({ password, title, userId })

    expect(encryptPassword.encrypt).toHaveBeenCalledWith({
      password
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
