import crypto from 'node:crypto'

import { CryptoService } from './crypto'

export class TDEAEncryptionService implements CryptoService {
  constructor (private readonly algorithm: string, private readonly key: string) {}

  decrypt ({ text }: CryptoService.Input): CryptoService.Output {
    const md5Key = crypto
      .createHash('md5')
      .update(this.key)
      .digest('hex')
      .slice(0, 24)
    const decipher = crypto.createDecipheriv('des-ede3', md5Key, '')

    let decrypted = decipher.update(text, 'base64', 'utf8')
    decrypted += decipher.final('utf8')
    return decrypted
  }

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
