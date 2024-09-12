import { Request, Response } from 'express'
import { logger } from '../utils/logger'

export const getAllHealth = (req: Request, res: Response) => {
  logger.info('Get health success')
  res.status(200).send({
    status: true,
    statusCode: 200,
    data: [
      { nama: 'Muammar Rizal', npm: '202043502004' },
      { nama: 'Alfina Rahmalia', npm: '202043502001' },
      { nama: 'Adlian simatupang', npm: '202043502002' }
    ]
  })
}
