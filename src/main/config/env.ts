import 'dotenv/config'

export const env = {
  crypto: {
    algorithm: process.env.CRYPTO_ALGORITHM ?? '',
    key: process.env.CRYPTO_KEY ?? ''
  },
  appPort: process.env.APP_PORT ?? 3000
}
