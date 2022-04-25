import { HttpRequest, HttpResponse } from '@/application/helpers/http'

export interface Controller {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}
