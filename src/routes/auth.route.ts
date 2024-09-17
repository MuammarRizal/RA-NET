import { Router } from 'express'
import {
  CreateUserController,
  CreateUserSessionController,
  CreateGetAllUsersController,
  refreshSession
} from '../controllers/auth.controller'

export const AuthRouter: Router = Router()

AuthRouter.post('/register', CreateUserController)
AuthRouter.post('/login', CreateUserSessionController)
AuthRouter.post('/refresh', refreshSession)

// get all users
AuthRouter.get('/users', CreateGetAllUsersController)
