import crypto from 'node:crypto'

import { CryptoService } from '../src/crypto'
import { env } from '../src/env'

class TDEAEncryptionService implements CryptoService {
  constructor (private readonly algorithm: string, private readonly key: string) {}

  encrypt ({ text }: CryptoService.Input): CryptoService.Output {
    const md5Key = crypto
      .createHash(this.algorithm)
      .update(this.key)
      .digest('hex')
      .slice(0, 24)
    const cipher = crypto.createCipheriv('des-ede3', md5Key, '')

    let encrypted = cipher.update(text, 'utf8', 'base64')
    encrypted += cipher.final('base64')
    return encrypted
  }
}

describe('CryptoService', () => {
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
})
