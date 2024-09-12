import { Router } from 'express'
import { createProduct, getProducts } from '../controllers/product.controller'

export const ProductsRouter: Router = Router()

ProductsRouter.get('/', getProducts)
ProductsRouter.get('/:id', getProducts)

ProductsRouter.post('/', createProduct)
