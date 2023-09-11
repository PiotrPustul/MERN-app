const { v4: uuidv4 } = require('uuid')
const HttpError = require('../models/http-error')
const { validationResult } = require('express-validator')

const DUMMY_USERS = [
  {
    id: 'u1',
    name: 'Piotr',
    email: 'a@a.a',
    password: '123456',
  },
]

const getAllUsers = (req, res, next) => {
  const users = DUMMY_USERS

  if (!users || users.length === 0) {
    throw new HttpError('Could not find any user', 404)
  }

  res.json({ users })
}

const signup = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422)
  }
  const { name, email, password } = req.body

  const hasUser = DUMMY_USERS.find((u) => u.email === email)

  if (hasUser) {
    throw new HttpError('Email already exist', 422)
  }
  const newUser = {
    id: uuidv4(),
    name,
    email,
    password,
  }

  DUMMY_USERS.push(newUser)

  res.status(201).json({ message: 'signup', newUser, DUMMY_USERS })
}

const login = (req, res, next) => {
  const { email, password } = req.body

  const user = DUMMY_USERS.find((u) => u.email === email)

  if (!user || user.password !== password) {
    throw new HttpError(
      'Could not login. Double-check the email and password',
      401
    )
  }

  res.status(200).json({ message: 'Logged in', user })
}

exports.getAllUsers = getAllUsers
exports.signup = signup
exports.login = login
