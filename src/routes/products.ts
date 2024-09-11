import { NextFunction, Request, Response, Router } from 'express'
import { logger } from '../utils/logger'

export const ProductsRouter: Router = Router()

ProductsRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  logger.info('Get Products success')
  res.status(200).send({ products: [{ product: 'products-1' }] })
})

ProductsRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({
    status: true,
    statusCode: 200,
    data: {
      id: +new Date(),
      ...req.body
    }
  })
})
