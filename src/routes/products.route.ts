import { Router } from 'express'
import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/product.controller'

export const ProductsRouter: Router = Router()

ProductsRouter.get('/', getProducts)
ProductsRouter.get('/:product_id', getProducts)

ProductsRouter.post('/', createProduct)

ProductsRouter.put('/:product_id', updateProduct)
ProductsRouter.delete('/:product_id', deleteProduct)
