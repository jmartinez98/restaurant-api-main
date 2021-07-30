const { Schema, model } = require('mongoose')

const ReservaSchema = new Schema(
  {
    mesa: {
      type: Schema.Types.ObjectId,
      ref: 'Mesa',
    },
    usuario: {
      type: Schema.Types.ObjectId,
      ref: 'Usuarios',
    },
    estado: {
      type: String,
      trim: true,
      lowercase: true,
      default: 'reserva',
    },
    fecha: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    versionKey: false,
  }
)

module.exports = model('Reserva', ReservaSchema)
