import { HttpResponse } from '@/application/helpers/http'

export interface Controller {
  handle: (httpRequest: any) => Promise<HttpResponse>
}
