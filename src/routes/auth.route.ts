import { Router } from 'express'
import { CreateUserController } from '../controllers/auth.controller'

export const AuthRouter: Router = Router()

AuthRouter.post('/', CreateUserController)
