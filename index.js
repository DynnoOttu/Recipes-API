const express = require('express')
require('dotenv').config()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mainRouter = require('./src/routes')
const app = express()
const port = 3000
const cors = require('cors')

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('combined'))
app.use('/', mainRouter)
app.use('/img', express.static('./temp'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
