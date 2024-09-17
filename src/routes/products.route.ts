import { Router } from 'express'
import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/product.controller'
import { requireAdmin, requireUser } from '../middlewares/auth'

export const ProductsRouter: Router = Router()

ProductsRouter.get('/', getProducts)
ProductsRouter.get('/:product_id', getProducts)

ProductsRouter.post('/', requireAdmin, createProduct)

ProductsRouter.put('/:product_id', requireAdmin, updateProduct)
ProductsRouter.delete('/:product_id', requireAdmin, deleteProduct)
