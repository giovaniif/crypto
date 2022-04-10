// namespace CreatePasswordRepository {
//   export type Input = {
//     password: string
//     title: string
//     userId: string
//   }
// }

// export interface CreatePasswordRepository {
//   createPassword: (input: CreatePasswordRepository.Input) => Promise<void>
// }
namespace EncryptPassword {
  export type Input = {
    password: string
  }
  export type Output = string
}
export interface EncryptPassword {
  encrypt: (input: EncryptPassword.Input) => Promise<EncryptPassword.Output>
}

export type CreatePassword = (input: Input) => Output
type Setup = (encryptPassword: EncryptPassword) => CreatePassword
type Input = { password: string }
type Output = Promise<void>

export const setupCreatePassword: Setup = (encryptPassword) => {
  return async ({ password }) => {
    await encryptPassword.encrypt({ password })
  }
}
