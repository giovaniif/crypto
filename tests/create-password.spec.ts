import { mock } from 'jest-mock-extended'

import { EncryptPassword, setupCreatePassword } from '../src/create-password'

describe('Create Password Usecase', () => {
  it('should call encryptPassword with correct password', async () => {
    const encryptPassword = mock<EncryptPassword>()
    const sut = setupCreatePassword(encryptPassword)
    const password = 'any_pasword'

    await sut({ password })

    expect(encryptPassword.encrypt).toHaveBeenCalledWith({
      password
    })
    expect(encryptPassword.encrypt).toHaveBeenCalledTimes(1)
  })
})
