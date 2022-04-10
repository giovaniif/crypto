import { mock } from 'jest-mock-extended'

import { CreatePasswordRepository, setupCreatePassword } from '../src/create-password'

describe('Create Password Usecase', () => {
  it('should call create password repository with correct input', async () => {
    const createPasswordRepository = mock<CreatePasswordRepository>()
    const sut = setupCreatePassword(createPasswordRepository)
    const password = 'any_pasword'
    const title = 'any_title'
    const userId = 'any_user_id'

    await sut({ password, title, userId })

    expect(createPasswordRepository.createPassword).toHaveBeenCalledWith({
      password,
      title,
      userId
    })
    expect(createPasswordRepository.createPassword).toHaveBeenCalledTimes(1)
  })
})
