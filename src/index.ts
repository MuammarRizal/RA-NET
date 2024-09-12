import Express, { Application, NextFunction, Request, Response } from 'express'
import { routes } from './routes/index.routes'
import { logger } from './utils/logger'
import bodyParser from 'body-parser'
import cors from 'cors'

// connect DB
import './utils/connectDB'
const app: Application = Express()
const PORT: Number = 4000

// parse body request
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// cors access handler
app.use(cors())
app.use((req: Request, res: Response, next: NextFunction) => {
  // Memberikan control ketika ingin mengakses REST API
  res.setHeader('Access-Control-Allow-Origin', '*') // Allowed url any to access
  res.setHeader('Access-Control-Allow-Methods', '*') // Allowrd methods anything to access
  res.setHeader('Access-Control-Allow-Headers', '*') // Given headers anything to access
  next()
})

// Routes for to access
routes(app)

app.listen(PORT, () => {
  logger.info(`Server is listening at port : ` + PORT)
})
