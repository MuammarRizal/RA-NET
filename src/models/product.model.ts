import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema(
  {
    product_id: {
      type: String,
      unique: true
    },
    name: {
      type: String,
      unique: true
    },
    price: {
      type: Number
    },
    size: {
      type: String
    },
    gender: {
      type: String
    }
  },
  { timestamps: true }
)

const productModel = mongoose.model('product', ProductSchema)

export default productModel
