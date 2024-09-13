import Joi from 'joi'
import { ProductType, UpdateProductType } from '../types/products.types'

export const createProductValidation = (payload: ProductType) => {
  const schema = Joi.object({
    // get from payload request
    product_id: Joi.string().required(),
    name: Joi.string().required(), // request name is required
    price: Joi.number().allow('', null), // request price may be empty
    size: Joi.string().allow('', null),
    gender: Joi.string().allow('', null)
  })

  return schema.validate(payload)
}

export const updateProductValidation = (payload: UpdateProductType) => {
  const schema = Joi.object({
    // get from payload request
    name: Joi.string(), // request name is required
    price: Joi.number().allow('', null), // request price may be empty
    size: Joi.string().allow('', null),
    gender: Joi.string().allow('', null)
  })

  return schema.validate(payload)
}
