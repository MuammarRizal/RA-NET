import { Application, Router } from 'express'
import { HealthRouter } from './health.route'
import { ProductsRouter } from './products.route'
import { AuthRouter } from './auth.route'

const _routes: Array<[string, Router]> = [
  ['/health', HealthRouter],
  ['/products', ProductsRouter],
  ['/', AuthRouter]
]

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}
