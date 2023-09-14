const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const { MDB_USER, MDB_PASSWORD, PORT } = require('./util/server')
const placesRoutes = require('./routes/places-routes')
const usersRoutes = require('./routes/users-routes')
const HttpError = require('./models/http-error')

const app = express()

app.use(bodyParser.json())

app.use('/api/places', placesRoutes)
app.use('/api/users', usersRoutes)

app.use((req, res, next) => {
  throw new HttpError('Could not find the route.', 404)
})

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error)
  }
  res.status(error.code || 500)
  res.json({ message: error.message || 'An unknown error occured' })
})

mongoose
  .connect(
    `mongodb+srv://${MDB_USER}:${MDB_PASSWORD}@mern-app.easrui5.mongodb.net/places?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(PORT)
  })
  .catch((error) => {
    console.log(error)
  })
