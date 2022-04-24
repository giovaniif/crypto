import { Router } from 'express'

export default (router: Router): void => {
  router.post('/passwords', (req, res) => {
    res.send('Hello World!')
  })
}
