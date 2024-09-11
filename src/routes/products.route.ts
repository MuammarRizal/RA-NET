import { NextFunction, Request, Response, Router } from 'express'
import { logger } from '../utils/logger'
import { createProductValidation } from '../validation/products.validation'

export const ProductsRouter: Router = Router()

ProductsRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  logger.info('Get Products success')
  res.status(200).send({ products: [{ product: 'products-1' }] })
})

ProductsRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = createProductValidation(req.body)
  if (error) {
    logger.error('ERR: /product - create = ', error.details[0].message)
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.details[0].message,
      data: {},
      detail: {
        ...error.details[0]
      }
    })
  }

  return res.status(200).send({
    status: true,
    statusCode: 200,
    message: 'Add product success',
    data: {
      id: +new Date(),
      ...value
    }
  })
})
