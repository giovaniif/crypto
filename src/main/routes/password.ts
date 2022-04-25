import { Router } from 'express'

import { adaptExpressRoute } from '@/main/adapters'
import { makeCreatePasswordController } from '@/main/factories/controllers'

export default (router: Router): void => {
  router.post('/passwords', adaptExpressRoute(makeCreatePasswordController()))
}
