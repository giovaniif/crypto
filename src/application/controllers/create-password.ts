import { IdValidator } from '@/application/contracts/gateways'
import { CreatePassword } from '@/domain/usecases'
import { HttpRequest, HttpResponse } from '@/application/helpers/http'
import { InvalidParamError, MissingParamError } from '@/application/errors'
import { UserNotFoundError } from '@/domain/errors'

type Request = HttpRequest<{ password?: string, title?: string }>
type Response = HttpResponse<MissingParamError | InvalidParamError | UserNotFoundError | { password: string, userId: string, title: string }>

export class CreatePasswordController {
  constructor (private readonly idValidator: IdValidator, private readonly createPassword: CreatePassword) {}

  async handle (httpRequest: Request): Promise<Response> {
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
      const createdPassword = await this.createPassword({ password, title, userId })
      return {
        body: createdPassword,
        statusCode: 201
      }
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
  }
}
