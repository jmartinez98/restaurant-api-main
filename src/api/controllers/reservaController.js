const { validationResult } = require('express-validator')
const Reserva = require('../models/Reserva')

exports.crearReserva = async (req, res) => {
  const errs = validationResult(req)
  if (!errs.isEmpty()) {
    res.status(400).json({ errores: errs.array() })
    return
  }

  try {
    const reservaModel = new Reserva(req.body)

    await reservaModel.save((err, room) => {
      if (err) {
        res.status(400).send({ msg: 'Error al insertar en la base de datos' })
        return
      }
      res.status(201).json({ msg: 'reserva ingresada con exito', id: room.id })
    })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

exports.buscarReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find()
      .populate({ path: 'mesa' })
      .populate({ path: 'usuario', select: '-password' })

      .exec()

    if (!reservas) {
      res.status(404).json({ msg: 'No se encontraron reservas' })
      return
    }

    res.status(200).json({
      msg: 'Busqueda realizada con exito',
      data: reservas,
    })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

exports.buscarReservaID = async (req, res) => {
  try {
    const reservas = await Reserva.findById(req.params.id)
      .populate({ path: 'mesa' })
      .populate({ path: 'usuario', select: '-password' })
      .exec()

    if (!reservas) {
      res.status(404).json({ msg: 'No se encontraron reservas' })
      return
    }

    res.status(200).json({
      msg: 'Busqueda realizada con exito',
      data: reservas,
    })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

exports.buscarReservaUsuario = async (req, res) => {
  try {
    const reservas = await Reserva.find({ usuario: req.params.id })
      .populate({ path: 'mesa' })
      .populate({ path: 'usuario', select: '-password' })
      .exec()

    if (!reservas) {
      res.status(404).json({ msg: 'No se encontraron reservas' })
      return
    }

    res.status(200).json({
      msg: 'Busqueda realizada con exito',
      data: reservas,
    })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

exports.modificarReserva = async (req, res) => {
  try {
    let reservaEncontrado = await Reserva.findById(req.params.id)
    if (!reservaEncontrado) {
      res.status(404).json({ msg: 'Reserva ha modificar no encontrado' })
      return
    }

    reservaEncontrado = await Reserva.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    )
    res
      .status(200)
      .json({ msg: 'reserva modificado con exito', data: reservaEncontrado })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

exports.eliminarReserva = async (req, res) => {
  try {
    const reservaEncontrado = await Reserva.findById(req.params.id)
    if (!reservaEncontrado) {
      res.status(404).json({ msg: 'Reserva a eliminar no encontrado' })
      return
    }
    await Reserva.findOneAndRemove({ _id: req.params.id })
    res.status(200).json({ msg: 'Reserva eliminado con exito' })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}
