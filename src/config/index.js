require('dotenv').config({ path: '.env' })

const config = {
  port: process.env.PORT || 1323,
  cors: process.env.CORS || '*',
  dbMongo: process.env.URL_MONGO,
}

module.exports = { config }
