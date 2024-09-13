import authModel from '../models/auth.model'
import { createUserType } from '../types/auth.types'

export const createUserToDB = async (payload: createUserType) => {
  return await authModel.create(payload)
}
