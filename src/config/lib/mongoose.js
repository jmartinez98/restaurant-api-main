/* eslint-disable no-console */
const mongoose = require('mongoose')
const conectarDB = async (url) => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    console.log('DB Conectada')
  } catch (error) {
    console.log('hubo un error')
    console.log(error)
    process.exit(1)
  }
}

module.exports = conectarDB
