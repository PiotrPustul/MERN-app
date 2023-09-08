const { v4: uuidv4 } = require('uuid')
const HttpError = require('../models/http-error')

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

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid

  const place = DUMMY_PLACES.find((p) => p.id === placeId)

  if (!place) {
    throw new HttpError('Could not find the place for the provided id', 404)
  }

  res.json({ place })
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

const createPlace = (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body

  const createdPlace = {
    id: uuidv4(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  }

  DUMMY_PLACES.push(createdPlace)

  console.log(DUMMY_PLACES)

  res.status(201).json({ place: createdPlace })
}

const updatePlaceById = (req, res, next) => {
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

  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId)
  res.status(200).json({ message: 'Deleted place' })
}

exports.getPlaceById = getPlaceById
exports.getPlacesByUserId = getPlacesByUserId
exports.createPlace = createPlace
exports.updatePlaceById = updatePlaceById
exports.deletePlaceById = deletePlaceById
