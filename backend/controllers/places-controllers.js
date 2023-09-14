const { v4: uuidv4 } = require('uuid')
const { validationResult } = require('express-validator')

const HttpError = require('../models/http-error')
const getCoordsForAddress = require('../util/location')
const Place = require('../models/placeSchema')

let DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'Famous building',
    location: {
      lat: 40.7484405,
      lng: -73.9856644,
    },
    address: '20 W 34th St., New York, NY 10001, United States',
    creator: 'u1',
  },
  {
    id: 'p2',
    title: 'Emp...',
    description: 'Famous building',
    location: {
      lat: 40.7484405,
      lng: -73.9856644,
    },
    address: '20 W 34th St., New York, NY 10001, United States',
    creator: 'u1',
  },
]

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid

  let place
  try {
    place = await Place.findById(placeId)
  } catch (error) {
    return next(new HttpError('Could not find a place', 500))
  }

  if (!place) {
    return next(
      new HttpError('Could not find the place for the provided id', 404)
    )
  }

  res.json({ place: place.toObject({ getters: true }) })
}

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid

  const places = DUMMY_PLACES.filter((p) => p.creator === userId)

  if (!places || places.length === 0) {
    return next(
      new HttpError('Could not find places for the provided user ID', 404)
    )
  }

  res.json({ places })
}

const createPlace = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    )
  }

  const { title, description, address, creator } = req.body

  let coordinates
  try {
    coordinates = await getCoordsForAddress(address)
  } catch (error) {
    return next(error)
  }

  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    imgage:
      'https://media.cntraveler.com/photos/57d87670fd86274a1db91acd/1:1/w_1536,h_1536,c_limit/most-beautiful-paris-pont-alexandre-iii-GettyImages-574883771.jpg',
    creator,
  })

  try {
    await createdPlace.save()
  } catch (error) {
    return next(new HttpError('Could not create a place', 500))
  }

  res.status(201).json({ place: createdPlace })
}

const updatePlaceById = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422)
  }

  const { title, description } = req.body
  const placeId = req.params.pid

  const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) }
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId)
  updatedPlace.title = title
  updatedPlace.description = description

  DUMMY_PLACES[placeIndex] = updatedPlace

  res.status(200).json({ place: updatedPlace })
}

const deletePlaceById = (req, res, next) => {
  const placeId = req.params.pid

  if (!DUMMY_PLACES.filter((p) => p.id !== placeId)) {
    throw new HttpError('Could not find the place for provided ID', 404)
  }

  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId)
  res.status(200).json({ message: 'Deleted place' })
}

exports.getPlaceById = getPlaceById
exports.getPlacesByUserId = getPlacesByUserId
exports.createPlace = createPlace
exports.updatePlaceById = updatePlaceById
exports.deletePlaceById = deletePlaceById
