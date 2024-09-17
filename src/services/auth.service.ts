import authModel from '../models/auth.model'
import { createUserType } from '../types/auth.types'

export const createUserToDB = async (payload: createUserType) => {
  return await authModel.create(payload)
}

export const findUserByEmail = async (email: string) => {
  return await authModel.findOne({ email })
}

export const getAllUsers = async () => {
  return await authModel.find()
}
