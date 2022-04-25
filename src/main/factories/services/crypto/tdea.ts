import { TDEAEncryptionService } from '@/infra/gateways'
import { env } from '@/main/config/env'

export const makeTdeaEncryptionService = (): TDEAEncryptionService => new TDEAEncryptionService(env.crypto.algorithm, env.crypto.key)
