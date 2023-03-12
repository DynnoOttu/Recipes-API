const nameChecker = (req, res, next) => {
  const name = req.body.name
  if (!name) {
    res.status(400).json({ status: 400, message: 'input name failed, maust be chararcter' })
  }
  next()
}

module.exports = nameChecker
