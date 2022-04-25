import { LoadUserPasswordsController } from '@/application/controllers'
import { MissingParamError } from '@/application/errors'

describe('LoadUserPasswords', () => {
  let sut: LoadUserPasswordsController
  let loadUserPasswords: jest.Mock
  let passwords: Array<{ title: string, id: string, userId: string, password: string }>

  beforeAll(() => {
    loadUserPasswords = jest.fn()
    passwords = [{
      id: 'any_id',
      password: 'any_password',
      title: 'any_title',
      userId: 'any_userId'
    }]
    loadUserPasswords.mockImplementation(async () => passwords)
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

  it('should return 200 if usecase performs', async () => {
    const httpRequest = { body: { userId: 'any_id' } }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(passwords)
  })
})
