import { LoadUserPasswordsController } from '@/application/controllers'
import { MissingParamError } from '@/application/errors'

describe('LoadUserPasswords', () => {
  let sut: LoadUserPasswordsController

  beforeEach(() => {
    sut = new LoadUserPasswordsController()
  })

  it('should return 400 if user id is not provided', async () => {
    const httpRequest = { body: { userId: undefined } }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('userId'))
  })
})
