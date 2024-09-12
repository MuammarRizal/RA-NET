import { Request, Response } from 'express'
import { logger } from '../utils/logger'
import { createProductValidation } from '../validations/products.validation'

// GET METHODS

export const getProducts = (req: Request, res: Response) => {
  const { id } = req.params

  const products = [
    { id: 123, nama: 'Muammar Rizal', npm: 202043502004 },
    { id: 312, nama: 'Muammar Rizal', npm: 202043502004 },
    { id: 111, nama: 'Muammar Rizal', npm: 202043502004 }
  ]
  if (id) {
    const filteredProducts = products.filter((product) => {
      if (product.id === parseInt(id)) {
        return product
      }
    })
    if (filteredProducts.length > 0) {
      logger.info('Detail product success')
      return res.status(200).send({
        status: true,
        statusCode: 200,
        message: 'Add detail product success',
        data: {
          ...filteredProducts[0]
        }
      })
    } else {
      logger.info('Data not found')
      return res.status(422).send({
        status: false,
        statusCode: 422,
        message: 'Data Not Found',
        data: {}
      })
    }
  }
  logger.info('Get All Products success')
  res.status(200).send({ products: products })
}

// POST METHODS
export const createProduct = (req: Request, res: Response) => {
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
}
