import Joi from 'joi'
import { createUserType } from '../types/auth.types'

export const createUserValidation = (payload: createUserType) => {
  const schema = Joi.object({
    user_id: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().allow('', null)
  })

  return schema.validate(payload)
}
