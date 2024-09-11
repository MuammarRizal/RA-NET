import Express, { Application } from 'express'
import { routes } from './routes'
import { logger } from './utils/logger'
const app: Application = Express()
const PORT: Number = 4000

routes(app)

app.listen(PORT, () => {
  logger.info(`Server is listening at port : `+ PORT)
})
