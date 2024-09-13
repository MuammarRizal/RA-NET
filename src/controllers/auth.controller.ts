import { Request, Response } from 'express'
import { createUserValidation } from '../validations/auth.validation'
import { v4 as uuidv4 } from 'uuid'
import { createUserToDB } from '../services/auth.service'
import { logger } from '../utils/logger'
import { hashingPassword } from '../utils/hashingPassword'

export const CreateUserController = async (req: Request, res: Response) => {
  req.body.user_id = uuidv4()
  req.body.password = hashingPassword(req.body.password)
  console.log(req.body)
  const { error, value } = createUserValidation(req.body)

  try {
    await createUserToDB(value)
    logger.info('Create Is success : ')
    return res.status(201).send({
      status: true,
      message: 'Create user is success',
      data: value
    })
  } catch (err) {
    console.log(err)
    console.log(error)
  }
}
