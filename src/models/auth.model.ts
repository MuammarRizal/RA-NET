import mongoose from 'mongoose'

const authModelUser = new mongoose.Schema(
  {
    user_id: {
      type: String,
      unique: true
    },
    email: {
      type: String,
      unique: true
    },
    name: {
      type: String,
      default: ''
    },

    password: {
      type: String,
      default: ''
    },
    role: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
)

const authModel = mongoose.model('user', authModelUser)
export default authModel
