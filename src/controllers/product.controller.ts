import { Request, Response } from 'express'
import { logger } from '../utils/logger'
import { createProductValidation } from '../validations/products.validation'
import {
  addProductDB,
  deleteProductDB,
  getDetailProductFromDB,
  getProductFromDB,
  updateProductDB
} from '../services/product.service'
import { v4 as uuidv4 } from 'uuid'

// GET METHODS
export const getProducts = async (req: Request, res: Response) => {
  const { product_id } = req.params

  const products: any = await getProductFromDB()

  if (product_id) {
    const data = await getDetailProductFromDB(product_id)
    if (data) {
      logger.info('Detail product success')
      return res.status(200).send({
        status: true,
        statusCode: 200,
        message: 'Add detail product success',
        data
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
  logger.info('Get all data succesfully')
  return res.status(200).send({
    status: true,
    message: 'Get all data succesfully',
    data: products
  })
}

// POST METHODS
export const createProduct = async (req: Request, res: Response) => {
  req.body.gender = 'man-man'
  req.body.product_id = uuidv4()
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
  try {
    await addProductDB(value)
    return res.status(200).send({
      status: true,
      statusCode: 200,
      message: 'Add product success'
    })
  } catch (err) {
    logger.info('Error push to db : ', err)
    return res.status(301).send({
      status: false,
      statusCode: 301,
      message: 'Add product is not success',
      error: err
    })
  }
}

// PUT METHODS
export const updateProduct = async (req: Request, res: Response) => {
  const { product_id } = req.params
  const payload = req.body
  // const validateProduct = await getDetailProductFromDB(product_id)

  try {
    // if (!validateProduct) {
    //   logger.info('Product is not found')
    //   return res.status(404).send({
    //     status: false,
    //     message: 'Product Not Found'
    //   })
    // }
    const result = await updateProductDB(product_id, payload)
    if (result) {
      logger.info('Update Is Successfully')
      return res.status(201).send({
        status: true,
        message: 'Update product is succesfully'
      })
    } else {
      logger.error('Error : Data is not found')
      return res.status(401).send({
        status: false,
        message: 'Update product is not succesfully'
      })
    }
  } catch (err) {
    logger.error('Error : ', err)
  }
}

// DELETE METHODS
export const deleteProduct = async (req: Request, res: Response) => {
  const { product_id } = req.params
  const resultDelete = await deleteProductDB(product_id)
  try {
    if (resultDelete) {
      logger.info('delete Is Successfully')
      return res.status(201).send({
        status: true,
        message: 'Delete product is succesfully'
      })
    } else {
      logger.error('Error : Data is not found')
      return res.status(401).send({
        status: false,
        message: 'delete product is not succesfully data not found'
      })
    }
  } catch (err) {}
}
