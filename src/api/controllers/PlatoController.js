const { validationResult } = require('express-validator')
const Plato = require('../models/Plato')

exports.crearPlato = async (req, res) => {
  const errs = validationResult(req)
  if (!errs.isEmpty()) {
    res.status(400).json({ errores: errs.array() })
    return
  }

  try {
    const { nombre } = req.body
    const platoEncontrada = await Plato.findOne({ nombre })
    if (platoEncontrada) {
      res.status(400).json({ msg: 'El plato con ese nombre ya existe' })
      return
    }

    const platoModel = new Plato(req.body)

    await platoModel.save((err, room) => {
      if (err) {
        res.status(400).send({ msg: 'Error al insertar en la base de datos' })
        return
      }
      res.status(201).json({ msg: 'plato ingresado con exito', id: room.id })
    })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

exports.buscarPlatos = async (req, res) => {
  try {
    const platos = await Plato.find()

    if (!platos) {
      res.status(404).json({ msg: 'No se encontraron platos' })
      return
    }

    res.status(200).json({
      msg: 'Busqueda realizada con exito',
      data: platos,
    })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

exports.modificarPlato = async (req, res) => {
  const errs = validationResult(req)
  if (!errs.isEmpty()) {
    res.status(400).json({ errores: errs.array() })
    return
  }

  try {
    const { nombre, descripcion } = req.body

    const nuevosDatos = {}

    if (nombre) {
      nuevosDatos.nombre = nombre
    }
    if (descripcion) {
      nuevosDatos.descripcion = descripcion
    }

    let platoEncontrada = await Plato.findById(req.params.id)
    if (!platoEncontrada) {
      res.status(404).json({ msg: 'Plato ha modificar no encontrada' })
      return
    }

    platoEncontrada = await Plato.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: nuevosDatos },
      { new: true }
    )
    res
      .status(200)
      .json({ msg: 'plato modificado con exito', data: platoEncontrada })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

exports.eliminarPlato = async (req, res) => {
  try {
    const platoEncontrada = await Plato.findById(req.params.id)
    if (!platoEncontrada) {
      res.status(404).json({ msg: 'Plato a eliminar no encontrada' })
      return
    }
    await Plato.findOneAndRemove({ _id: req.params.id })
    res.status(200).json({ msg: 'Plato eliminado con exito' })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}
