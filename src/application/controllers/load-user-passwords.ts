import { HttpRequest, HttpResponse } from '@/application/helpers/http'
import { Controller } from '@/application/controllers'
import { MissingParamError } from '@/application/errors'
import { LoadUserPasswords } from '@/domain/usecases'

type Request = HttpRequest<{ userId?: string }>
type Response = HttpResponse<MissingParamError | Array<{ userId: string, title: string, password: string, id: string }>>

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
      const passwords = await this.loadUserPasswords({ userId })
      return {
        statusCode: 200,
        body: passwords
      }
    } catch (err: any) {
      return {
        statusCode: 500,
        body: err
      }
    }
  }
}
