
const jwt = require('jsonwebtoken')

const key = process.env.JWT_KEY

const generateToken = (payload) => {
  console.log(payload)
  const verifOpt = {
    expiresIn: '365h'
  }
  const token = jwt.sign(payload, key, verifOpt)
  return token
}

const refreshToken = (payload) => {
  const verifyOpts = {
    expiresIn: '365h'
  }
  const refreshToken = jwt.sign(payload, key, verifyOpts)
  return refreshToken
}

module.exports = { generateToken, refreshToken }
