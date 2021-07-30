const { Schema, model } = require('mongoose')

const MesaSchema = new Schema(
  {
    numero: {
      type: Number,
      unique: true,
    },
    estado: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
  }
)

module.exports = model('Mesa', MesaSchema)
