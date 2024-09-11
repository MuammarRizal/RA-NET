import Joi from 'joi'

interface ProductInterface {
  name: String
  price: Number
}

export const createProductValidation = (payload: ProductInterface) => {
  const schema = Joi.object({
    // get from payload request
    name: Joi.string().required(), // request name is required
    price: Joi.number().allow('', null) // request price may be empty
  })

  return schema.validate(payload)
}
