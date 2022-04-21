type HttpRequest = {
  body: {
    password?: string
    title?: string
  }
}

type HttpResponse = {
  body: MissingParamError
  statusCode: number
}

class MissingParamError extends Error {
  constructor (param: string) {
    super()
    this.message = `Missing param: ${param}`
    this.name = 'MissingParamError'
  }
}

class CreatePasswordController {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (httpRequest.body.password === undefined || httpRequest.body.password === '' || httpRequest.body.password === null) {
      return {
        body: new MissingParamError('password'),
        statusCode: 400
      }
    }

    return {
      body: new MissingParamError('title'),
      statusCode: 400
    }
  }
}

describe('CreatePasswordController', () => {
  let sut: CreatePasswordController

  beforeEach(() => {
    sut = new CreatePasswordController()
  })

  it('should return 400 if no password is provided', async () => {
    const httpRequest = {
      body: {
        password: undefined
      }
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
      }
    }

    const response = await sut.handle(httpRequest)

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('title'))
  })
})
