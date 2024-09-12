import { Router } from 'express'
import { getAllHealth } from '../controllers/health.controller'

export const HealthRouter: Router = Router()

HealthRouter.get('/', getAllHealth)
