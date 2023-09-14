const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const placesRoutes = require('./routes/places-routes')
const usersRoutes = require('./routes/users-routes')
const HttpError = require('./models/http-error')

dotenv.config()
const mongoDB_User = process.env.MDB_USER
const mongoDB_Pass = process.env.MDB_PASSWORD
const port = process.env.PORT

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
    `mongodb+srv://${mongoDB_User}:${mongoDB_Pass}@mern-app.easrui5.mongodb.net/places?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(port)
  })
  .catch((error) => {
    console.log(error)
  })
