import productModel from '../models/product.model'
import { ProductType, UpdateProductType } from '../types/products.types'
import { logger } from '../utils/logger'

export const addProductDB = async (payload: ProductType) => {
  return await productModel.create(payload)
}

export const getProductFromDB = async () => {
  return await productModel
    .find()
    .then((data) => {
      return data
    })
    .catch((err) => {
      logger.info('Cannot get data from DB')
      logger.error(err)
    })
}

export const getDetailProductFromDB = async (id: String) => {
  return await productModel.findOne({ product_id: id })
}

export const updateProductDB = async (id: String, payload: UpdateProductType) => {
  return await productModel.findOneAndUpdate(
    {
      product_id: id
    },
    {
      $set: payload
    }
  )
}

export const deleteProductDB = async (id: String) => {
  return await productModel.findOneAndDelete({
    product_id: id
  })
}
