const { validationResult } = require('express-validator')
const Mesa = require('../models/Mesa')

exports.crearMesa = async (req, res) => {
  const errs = validationResult(req)
  if (!errs.isEmpty()) {
    res.status(400).json({ errores: errs.array() })
    return
  }

  try {
    const { numero } = req.body
    const mesaEncontrada = await Mesa.findOne({ numero })
    if (mesaEncontrada) {
      res.status(400).json({ msg: 'La mesa con ese numero ya existe' })
      return
    }

    const mesaModel = new Mesa(req.body)

    await mesaModel.save((err, room) => {
      if (err) {
        res.status(400).send({ msg: 'Error al insertar en la base de datos' })
        return
      }
      res.status(201).json({ msg: 'mesa ingresada con exito', id: room.id })
    })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

exports.buscarMesas = async (req, res) => {
  try {
    const mesas = await Mesa.find()

    if (!mesas) {
      res.status(404).json({ msg: 'No se encontraron mesas' })
      return
    }

    res.status(200).json({
      msg: 'Busqueda realizada con exito',
      data: mesas,
    })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

exports.modificarMesa = async (req, res) => {
  const errs = validationResult(req)
  if (!errs.isEmpty()) {
    res.status(400).json({ errores: errs.array() })
    return
  }

  try {
    let mesaEncontrada = await Mesa.findById(req.params.id)
    if (!mesaEncontrada) {
      res.status(404).json({ msg: 'Mesa ha modificar no encontrada' })
      return
    }
    const { estado } = req.body

    if (mesaEncontrada.estado === false && estado === false) {
      res.status(400).json({ msg: 'La mesa ya esta reservada' })
      return
    }

    mesaEncontrada = await Mesa.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    )
    res
      .status(200)
      .json({ msg: 'mesa modificado con exito', data: mesaEncontrada })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

exports.eliminarMesa = async (req, res) => {
  try {
    const mesaEncontrada = await Mesa.findById(req.params.id)
    if (!mesaEncontrada) {
      res.status(404).json({ msg: 'Mesa a eliminar no encontrada' })
      return
    }
    await Mesa.findOneAndRemove({ _id: req.params.id })
    res.status(200).json({ msg: 'Mesa eliminado con exito' })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}
