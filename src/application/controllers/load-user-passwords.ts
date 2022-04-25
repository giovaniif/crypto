import { HttpRequest, HttpResponse } from '@/application/helpers/http'
import { Controller } from '@/application/controllers'
import { MissingParamError } from '@/application/errors'

type Request = HttpRequest<{ userId?: string }>
type Response = HttpResponse<any>

export class LoadUserPasswordsController implements Controller {
  async handle (httpRequest: Request): Promise<Response> {
    return {
      statusCode: 400,
      body: new MissingParamError('userId')
    }
  }
}
