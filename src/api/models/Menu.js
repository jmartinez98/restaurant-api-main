const { Schema, model } = require('mongoose')

const MenuSchema = new Schema(
  {
    nombre: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
    },
    precio: {
      type: Number,
    },
    estado: {
      type: Boolean,
      default: true,
    },
    platos: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Plato',
        },
      ],
    },
  },
  {
    versionKey: false,
  }
)

module.exports = model('Menu', MenuSchema)
