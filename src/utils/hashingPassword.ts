import bcrypt from 'bcrypt'
const hashingPassword = (password: string) => {
  return bcrypt.hashSync(password, 10)
}

export { hashingPassword }
