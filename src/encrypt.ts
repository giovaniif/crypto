namespace Encrypt {
  export type Input = {
    password: string
  }
  export type Output = string
}

export interface Encrypt {
  encrypt: (input: Encrypt.Input) => Encrypt.Output
}
