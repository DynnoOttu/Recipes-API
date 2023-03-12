const jwt = require('jsonwebtoken')
const key = process.env.JWT_KEY

const protect = (req, res, next) => {
  try {
    let token
    if (req.headers.authorization) {
      const auth = req.headers.authorization
      console.log(auth)
      token = auth.split(' ')[1]
      console.log(token)
      const decode = jwt.verify(token, key)
      req.payload = decode
      console.log(decode)
      next()
    } else {
      res.status(404).json({ status: 404, message: 'login failed, server need token' })
    }
  } catch (error) {
    console.log('error', error)
    // eslint-disable-next-line eqeqeq
    if (error && error.name == 'JsonWebTokenError') {
      res.status(404).json({ status: 404, message: 'login failed, invailed token' })
    // eslint-disable-next-line eqeqeq
    } else if (error && error.name == 'TokenExpiredError') {
      res.status(404).json({ status: 404, message: 'login failed, invailed expired' })
    } else {
      res.status(404).json({ status: 404, message: 'login failed, token not active' })
    }
  }
}

module.exports = { protect }
