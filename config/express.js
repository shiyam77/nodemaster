const compression = require('compression')
const express = require('express')
const app = express()
const multer = require('multer')
const morgan = require('morgan')
const helmet = require('helmet')
require('./database')
const swaggerDocument = require('./swagger')
const api = require('../components')
const cors = require('cors')

app.set('trust proxy', true)
app.use(compression())
app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
app.use('/', api)
app.use(express.static('uploads'))
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.get('/api-docs', async function (req, res) {
  const swaggerui = '//swagger-ui.now.sh'
  const myorigin = `${req.protocol}://${req.headers.host}`
  const url = `${swaggerui}?url=${myorigin}/swagger`
  res.setHeader('Location', url)
  res.sendStatus(307)
})

app.get('/swagger', async function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.send(JSON.stringify(swaggerDocument))
})
// catch 404 and forward to error handler
app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    message: 'requested source not found'
  })
})

// error handler
app.use(function (e, req, res, next) {
  let statusCode = e.status || 500
  let message
  const dev = {}

  if (e.name === 'UnauthorizedError') {
    // jwt middleware // && e.inner.name === 'JsonWebTokenError'
    console.error(e)
    message = e.message || e.inner.message || 'Please login and proceed'
  } else if (e.code === 11000) {
    // custom error
    statusCode = e.statusCode
    message = 'Created record already exist'
  } else if (e.name === 'ClientError') {
    // custom error
    statusCode = e.statusCode
    message = e.message
  } else if (e instanceof multer.MulterError) {
    // multer error
    message = e.message
  } else {
    console.error(e)
    message = 'Something went wrong'
  }

  if (process.env.NODE_ENV !== 'production' && e.name !== 'ClientError') {
    dev._errorData = { name: e.name, message: e.message }
    dev._error = e
  }

  res.status(statusCode).send({ success: 'error', message, ...dev })
})

module.exports = app
