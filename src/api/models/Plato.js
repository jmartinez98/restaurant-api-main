const { Schema, model } = require('mongoose')

const PlatoSchema = new Schema(
  {
    nombre: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
    },
    descripcion: {
      type: String,
      trim: true,
      lowercase: true,
    },
  },
  {
    versionKey: false,
  }
)

module.exports = model('Plato', PlatoSchema)
