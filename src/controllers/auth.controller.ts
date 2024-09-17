import { Request, Response } from 'express'
import { createSessionValidation, createUserValidation, refreshSessionValidation } from '../validations/auth.validation'
import { v4 as uuidv4 } from 'uuid'
import { createUserToDB, findUserByEmail, getAllUsers } from '../services/auth.service'
import { logger } from '../utils/logger'
import { checkPasswordDecode, hashingPassword } from '../utils/hashingPassword'
import { signJWT, verifyJWT } from '../utils/jwt'

export const CreateGetAllUsersController = async (req: Request, res: Response) => {
  try {
    const getAllUsersFromDB = await getAllUsers()
    logger.info('Get All users success')
    return res
      .status(200)
      .send({ status: true, message: 'Get all users success', data: { usersEncrypt: getAllUsersFromDB } })
  } catch (error) {}

  return res.send({ status: false, message: 'Check Your connections' })
}

export const CreateUserController = async (req: Request, res: Response) => {
  req.body.user_id = uuidv4()
  req.body.password = hashingPassword(req.body.password)
  const { error, value } = createUserValidation(req.body)

  if (error) {
    return res.status(401).send({
      status: false,
      message: error
    })
  }
  try {
    await createUserToDB(value)
    logger.info('Create Is success : ')
    return res.status(201).send({
      status: true,
      message: 'Create user is success',
      data: value
    })
  } catch (err: any) {
    console.log(err)
    return res.send({ status: false, message: err.errmsg })
  }
}

export const CreateUserSessionController = async (req: Request, res: Response) => {
  const { error, value } = createSessionValidation(req.body)
  if (error) {
    logger.info('Email dan password is needed : ', error.message)
    return res.send({ status: false, message: 'Email dan password is needed', error: error.message })
  }

  try {
    const user: any = await findUserByEmail(value.email)
    const validatePassword: boolean = checkPasswordDecode(req.body.password, user.password)

    if (!validatePassword) return res.json({ status: false, message: 'Email or password is invalid', codeStatus: 401 })

    const accessToken = signJWT({ ...user }, { expiresIn: '1d' })
    const refreshToken = signJWT({ ...user }, { expiresIn: '1y' })
    return res.status(200).send({ status: true, message: 'Login Success', data: { token: accessToken, refreshToken } })
  } catch (err) {
    logger.error('error : ', err)
    return res.status(401).send({ status: false, message: 'Email or password is invalid' })
  }
}

export const refreshSession = async (req: Request, res: Response) => {
  const { error, value } = refreshSessionValidation(req.body)
  if (error) {
    logger.info('error in refresh session : ', error.message)
    return res.send({ status: false, message: 'ERROR IN REFRESH TOKEN', error: error.message })
  }

  try {
    const { decoded } = verifyJWT(value.refreshToken)

    const user = await findUserByEmail(decoded._doc.email)

    if (!user) return false

    const accessToken = signJWT({ ...user }, { expiresIn: '1d' })
    return res.status(200).send({ status: true, message: 'refresh token Success', data: { token: accessToken } })
  } catch (error) {
    return res.status(401).send({ status: false, message: 'Error in refresh token' })
  }
}
