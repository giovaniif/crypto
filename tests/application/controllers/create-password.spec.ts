import { UserNotFoundError } from '@/domain/errors'
import { CreatePassword } from '@/domain/usecases'
import { mock, MockProxy } from 'jest-mock-extended'

type HttpRequest = {
  body: {
    password?: string
    title?: string
  }
  auth: {
    userId?: string
  }
}

type HttpResponse = {
  body: MissingParamError | InvalidParamError | UserNotFoundError
  statusCode: number
}

class MissingParamError extends Error {
  constructor (param: string) {
    super()
    this.message = `Missing param: ${param}`
    this.name = 'MissingParamError'
  }
}

class InvalidParamError extends Error {
  constructor (param: string) {
    super()
    this.message = `Invalid param: ${param}`
    this.name = 'InvalidParamError'
  }
}

interface IdValidator {
  isValid: (id: string) => boolean
}

class CreatePasswordController {
  constructor (private readonly idValidator: IdValidator, private readonly createPassword: CreatePassword) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { password, title } = httpRequest.body
    const { userId } = httpRequest.auth
    if (password === undefined || password === '' || password === null) {
      return {
        body: new MissingParamError('password'),
        statusCode: 400
      }
    }

    if (title === undefined || title === '' || title === null) {
      return {
        body: new MissingParamError('title'),
        statusCode: 400
      }
    }

    if (!this.idValidator.isValid(userId ?? '') || userId === undefined) {
      return {
        body: new InvalidParamError('userId'),
        statusCode: 400
      }
    }

    try {
      await this.createPassword({ password, title, userId })
    } catch (err: any) {
      if (err instanceof UserNotFoundError) {
        return {
          body: new UserNotFoundError(),
          statusCode: 400
        }
      }

      return {
        body: err,
        statusCode: 500
      }
    }
    return {} as any
  }
}

describe('CreatePasswordController', () => {
  let sut: CreatePasswordController
  let createPassword: jest.Mock
  let idValidator: MockProxy<IdValidator>

  beforeAll(() => {
    createPassword = jest.fn()
    idValidator = mock()
    idValidator.isValid.mockImplementation(() => true)
  })

  beforeEach(() => {
    sut = new CreatePasswordController(idValidator, createPassword)
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

  it('shold return 400 if an invalid user id is provided', async () => {
    const httpRequest = {
      body: {
        password: 'any_password',
        title: 'any_title'
      },
      auth: {
        userId: 'invalid_id'
      }
    }
    idValidator.isValid.mockImplementationOnce(() => false)

    const response = await sut.handle(httpRequest)

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new InvalidParamError('userId'))
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
})
