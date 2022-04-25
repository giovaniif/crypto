import { LoadUserPasswordsController } from '@/application/controllers'
import { MissingParamError } from '@/application/errors'

describe('LoadUserPasswords', () => {
  let sut: LoadUserPasswordsController
  let loadUserPasswords: jest.Mock

  beforeAll(() => {
    loadUserPasswords = jest.fn()
  })

  beforeEach(() => {
    sut = new LoadUserPasswordsController(loadUserPasswords)
  })

  it('should return 400 if user id is not provided', async () => {
    const httpRequest = { body: { userId: undefined } }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('userId'))
  })

  it('should call loadUserPasswords with correct values', async () => {
    const httpRequest = { body: { userId: 'any_id' } }

    await sut.handle(httpRequest)

    expect(loadUserPasswords).toHaveBeenCalledWith({ userId: 'any_id' })
    expect(loadUserPasswords).toHaveBeenCalledTimes(1)
  })

  it('should return 500 if loadUserPasswords throws', async () => {
    const httpRequest = { body: { userId: 'any_id' } }
    const error = new Error('any_error')
    loadUserPasswords.mockImplementationOnce(async () => { throw error })

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(error)
  })
})
