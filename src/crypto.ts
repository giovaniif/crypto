namespace CryptoService {
  export type Input = {
    password: string
  }
  export type Output = string
}

export interface CryptoService {
  encrypt: (input: CryptoService.Input) => CryptoService.Output
}
