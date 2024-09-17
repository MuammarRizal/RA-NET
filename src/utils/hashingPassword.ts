import bcrypt from 'bcrypt'

// encode
const hashingPassword = (password: string) => {
  return bcrypt.hashSync(password, 10)
}

// decode
const checkPasswordDecode = (password: string, userPassword: string) => {
  return bcrypt.compareSync(password, userPassword)
}

export { hashingPassword, checkPasswordDecode }
