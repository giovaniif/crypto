export namespace CryptoService {
  export type Input = {
    text: string
  }
  export type Output = string
}

export interface CryptoService {
  encrypt: (input: CryptoService.Input) => CryptoService.Output
}
