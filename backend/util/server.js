const dotenv = require('dotenv')

dotenv.config()

const API_KEY = process.env.LOCATION_API_KEY
const MDB_USER = process.env.MDB_USER
const MDB_PASSWORD = process.env.MDB_PASSWORD
const PORT = process.env.PORT

exports.API_KEY = API_KEY
exports.MDB_USER = MDB_USER
exports.MDB_PASSWORD = MDB_PASSWORD
exports.PORT = PORT
