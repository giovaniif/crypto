import { Router } from 'express'

import { adaptExpressRoute } from '@/main/adapters'
import { makeLoadUserPasswordsController } from '@/main/factories/controllers'

export default (router: Router): void => {
  router.get('/users/:userId/passwords', adaptExpressRoute(makeLoadUserPasswordsController()))
}
