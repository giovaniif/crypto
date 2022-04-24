export type HttpRequest <T = any> = {
  body: T
}

export type HttpResponse <T = any> = {
  body: T
  statusCode: number
}
