export class InvalidParamError extends Error {
  constructor (param: string) {
    super()
    this.message = `Invalid param: ${param}`
    this.name = 'InvalidParamError'
  }
}
