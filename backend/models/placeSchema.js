const { Schema, model } = require('mongoose')

const placeSchema = new Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  image: { type: String, require: true },
  address: { type: String, require: true },
  location: {
    lat: { type: Number, require: true },
    lng: { type: Number, require: true },
  },
  creator: { type: String, require: true },
})

module.exports = model('Place', placeSchema)
