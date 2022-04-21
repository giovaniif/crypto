export type HttpRequest <T = any> = {
  body: T
  auth: {
    userId?: string
  }
}

export type HttpResponse <T = any> = {
  body: T
  statusCode: number
}
