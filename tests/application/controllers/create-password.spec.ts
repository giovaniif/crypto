type HttpRequest = {
  body: {
    password?: string
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
    return {
      body: new MissingParamError('password'),
      statusCode: 400
    }
  }
}

describe('CreatePasswordController', () => {
  it('should return 400 if no password is provided', async () => {
    const sut = new CreatePasswordController()
    const httpRequest = {
      body: {
        password: undefined
      }
    }

    const response = await sut.handle(httpRequest)

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('password'))
  })
})
