const { validationResult } = require('express-validator')
const Pedido = require('../models/Pedido')

exports.crearPedido = async (req, res) => {
  const errs = validationResult(req)
  if (!errs.isEmpty()) {
    res.status(400).json({ errores: errs.array() })
    return
  }

  try {
    const pedidoModel = new Pedido(req.body)

    await pedidoModel.save((err, room) => {
      if (err) {
        res.status(400).send({ msg: 'Error al insertar en la base de datos' })
        return
      }
      res.status(201).json({ msg: 'pedido ingresado con exito', id: room.id })
    })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

exports.buscarPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find()
      .populate({
        path: 'reserva',
        populate: [
          {
            path: 'usuario',
            select: 'nombre',
          },
          {
            path: 'mesa',
            select: 'numero',
          },
        ],
      })
      .populate({
        path: 'pedidos',
        populate: {
          path: 'menu',
          populate: {
            path: 'platos',
          },
          select: '-estado',
        },
      })
      .exec()

    if (!pedidos) {
      res.status(404).json({ msg: 'No se encontraron pedidos' })
      return
    }

    res.status(200).json({
      msg: 'Busqueda realizada con exito',
      data: pedidos,
    })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

exports.buscarPedidoID = async (req, res) => {
  try {
    const pedidos = await Pedido.findById(req.params.id)
      .populate({
        path: 'reserva',
        populate: [
          {
            path: 'usuario',
            select: 'nombre',
          },
          {
            path: 'mesa',
            select: 'numero',
          },
        ],
      })
      .populate({
        path: 'pedidos',
        populate: {
          path: 'menu',
          populate: {
            path: 'platos',
          },
          select: '-estado',
        },
      })
      .exec()

    if (!pedidos) {
      res.status(404).json({ msg: 'No se encontraron pedidos' })
      return
    }

    res.status(200).json({
      msg: 'Busqueda realizada con exito',
      data: pedidos,
    })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

exports.buscarPedidoReserva = async (req, res) => {
  try {
    const pedidos = await Pedido.find({ reserva: req.params.id })
      .populate({
        path: 'reserva',
        populate: [
          {
            path: 'usuario',
            select: 'nombre',
          },
          {
            path: 'mesa',
            select: 'numero',
          },
        ],
      })
      .populate({
        path: 'pedidos',
        populate: {
          path: 'menu',
          populate: {
            path: 'platos',
          },
          select: '-estado',
        },
      })
      .exec()

    if (!pedidos) {
      res.status(404).json({ msg: 'No se encontraron pedidos' })
      return
    }

    res.status(200).json({
      msg: 'Busqueda realizada con exito',
      data: pedidos,
    })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

exports.modificarPedido = async (req, res) => {
  try {
    const { reserva, pedidos, total } = req.body
    const nuevosDatos = {}

    if (reserva) {
      nuevosDatos.reserva = reserva
    }
    if (pedidos) {
      nuevosDatos.pedidos = pedidos
    }
    if (total) {
      nuevosDatos.total = total
    }

    let pedidoEncontrado = await Pedido.findById(req.params.id)
    if (!pedidoEncontrado) {
      res.status(404).json({ msg: 'Pedido ha modificar no encontrado' })
      return
    }

    pedidoEncontrado = await Pedido.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: nuevosDatos },
      { new: true }
    )
    res
      .status(200)
      .json({ msg: 'pedido modificado con exito', data: pedidoEncontrado })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

exports.eliminarPedido = async (req, res) => {
  try {
    const pedidoEncontrado = await Pedido.findById(req.params.id)
    if (!pedidoEncontrado) {
      res.status(404).json({ msg: 'Pedido a eliminar no encontrado' })
      return
    }
    await Pedido.findOneAndRemove({ _id: req.params.id })
    res.status(200).json({ msg: 'Pedido eliminado con exito' })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}
