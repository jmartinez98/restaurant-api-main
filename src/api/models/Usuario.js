const { Schema, model } = require('mongoose')

const bcrypt = require('bcryptjs')

const UsuarioSchema = new Schema(
  {
    nombre: {
      type: String,
      trim: true,
      lowercase: true,
    },
    correo: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    rol: {
      type: String,
      trim: true,
      lowercase: true,
      default: 'cliente',
    },
  },
  {
    versionKey: false,
  }
)

UsuarioSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

UsuarioSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

module.exports = model('Usuarios', UsuarioSchema)
