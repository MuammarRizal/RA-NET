import { Router } from 'express'
import {
  CreateUserController,
  CreateUserSessionController,
  CreateGetAllUsersController
} from '../controllers/auth.controller'

export const AuthRouter: Router = Router()

AuthRouter.post('/register', CreateUserController)
AuthRouter.post('/login', CreateUserSessionController)

// get all users
AuthRouter.get('/users', CreateGetAllUsersController)
