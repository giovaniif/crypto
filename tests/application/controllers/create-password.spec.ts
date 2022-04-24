import { UserNotFoundError } from '@/domain/errors'
import { CreatePasswordController } from '@/application/controllers'
import { MissingParamError } from '@/application/errors'

describe('CreatePasswordController', () => {
  let sut: CreatePasswordController
  let createPassword: jest.Mock

  beforeAll(() => {
    createPassword = jest.fn()
    createPassword.mockImplementation(async () => ({ any: 'any' }))
  })

  beforeEach(() => {
    sut = new CreatePasswordController(createPassword)
  })

  it('should return 400 if no password is provided', async () => {
    const httpRequest = {
      body: {
        password: undefined
      },
      auth: {}
    }

    const response = await sut.handle(httpRequest)

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('password'))
  })

  it('should return 400 if no title is provided', async () => {
    const httpRequest = {
      body: {
        password: 'any_password',
        title: undefined
      },
      auth: {}
    }

    const response = await sut.handle(httpRequest)

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('title'))
  })

  it('should return 400 if no userId is provided', async () => {
    const httpRequest = {
      body: {
        password: 'any_password',
        title: 'any_title'
      },
      auth: {}
    }

    const response = await sut.handle(httpRequest)

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('userId'))
  })

  it('should call createPassword with correct values', async () => {
    const httpRequest = {
      body: {
        password: 'any_password',
        title: 'any_title'
      },
      auth: {
        userId: 'valid_id'
      }
    }

    await sut.handle(httpRequest)

    expect(createPassword).toHaveBeenCalledWith({ userId: 'valid_id', password: 'any_password', title: 'any_title' })
    expect(createPassword).toHaveBeenCalledTimes(1)
  })

  it('should return 400 if CreatePassword throws UserNotFound error', async () => {
    const httpRequest = {
      body: {
        password: 'any_password',
        title: 'any_title'
      },
      auth: {
        userId: 'valid_id'
      }
    }
    createPassword.mockImplementationOnce(() => { throw new UserNotFoundError() })

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new UserNotFoundError())
  })

  it('should return 500 if CreatePassword throws unknown error', async () => {
    const httpRequest = {
      body: {
        password: 'any_password',
        title: 'any_title'
      },
      auth: {
        userId: 'valid_id'
      }
    }
    const error = new Error('any_error')
    createPassword.mockImplementationOnce(() => { throw error })

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(error)
  })

  it('should return 201 if usecase performs', async () => {
    const httpRequest = {
      body: {
        password: 'any_password',
        title: 'any_title'
      },
      auth: {
        userId: 'valid_id'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(201)
    expect(httpResponse.body).toEqual({ any: 'any' })
  })
})
