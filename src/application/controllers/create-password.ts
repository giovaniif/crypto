import { CreatePassword } from '@/domain/usecases'
import { HttpResponse } from '@/application/helpers/http'
import { MissingParamError } from '@/application/errors'
import { UserNotFoundError } from '@/domain/errors'

type Request = { password?: string, title?: string, userId?: string }
type Response = HttpResponse<MissingParamError | UserNotFoundError | { password: string, userId: string, title: string }>

export class CreatePasswordController {
  constructor (private readonly createPassword: CreatePassword) {}

  async handle ({ password, title, userId }: Request): Promise<Response> {
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

    if (userId === undefined) {
      return {
        body: new MissingParamError('userId'),
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
