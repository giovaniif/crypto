import { TDEAEncryptionService } from '../src/tdea-encryption-service'
import { env } from '../src/env'

describe('TDEAEncryptionService', () => {
  it('should encrypt a string', () => {
    const algorithm = env.crypto.algorithm
    const key = env.crypto.key
    const cryptoService = new TDEAEncryptionService(algorithm, key)
    const input = {
      text: 'password'
    }
    const output = cryptoService.encrypt(input)
    expect(output).not.toBe(input.text)
    expect(output.length).toBe(24)
  })

  it('should decrypt a string', () => {
    const algorithm = env.crypto.algorithm
    const key = env.crypto.key
    const cryptoService = new TDEAEncryptionService(algorithm, key)
    const input = {
      text: 'password'
    }
    const encrypted = cryptoService.encrypt(input)
    const output = cryptoService.decrypt({ text: encrypted })
    expect(output).toBe(input.text)
  })
})
