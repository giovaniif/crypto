import { RequestHandler } from 'express'

import { Controller } from '@/application/controllers'

type Adapter = (controller: Controller) => RequestHandler

export const adaptExpressRoute: Adapter = controller =>
  async (req, res) => {
    const { body, statusCode } = await controller.handle({ ...req.body, ...req.params })
    const json = [201, 200].includes(statusCode) ? body : { error: body.message }

    res.status(statusCode).json(json)
  }
