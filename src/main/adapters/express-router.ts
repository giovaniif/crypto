import { RequestHandler } from 'express'

import { Controller } from '@/application/controllers'

type Adapter = (controller: Controller) => RequestHandler

export const adaptExpressRoute: Adapter = controller =>
  async (req, res) => {
    const { body, statusCode } = await controller.handle({ body: { ...req.body } })
    const json = statusCode === 201 ? body : { error: body.message }

    res.status(statusCode).json(json)
  }
