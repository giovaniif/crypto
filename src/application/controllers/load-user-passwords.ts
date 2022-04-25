import { HttpRequest, HttpResponse } from '@/application/helpers/http'
import { Controller } from '@/application/controllers'
import { MissingParamError } from '@/application/errors'
import { LoadUserPasswords } from '@/domain/usecases'

type Request = HttpRequest<{ userId?: string }>
type Response = HttpResponse<any>

export class LoadUserPasswordsController implements Controller {
  constructor (private readonly loadUserPasswords: LoadUserPasswords) {}

  async handle (httpRequest: Request): Promise<Response> {
    const { userId } = httpRequest.body
    if (userId === undefined || userId === '' || userId === null) {
      return {
        statusCode: 400,
        body: new MissingParamError('userId')
      }
    }

    try {
      await this.loadUserPasswords({ userId })
      return {} as any
    } catch (err) {
      return {
        statusCode: 500,
        body: err
      }
    }
  }
}
