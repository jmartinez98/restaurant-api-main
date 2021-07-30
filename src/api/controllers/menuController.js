const { validationResult } = require('express-validator')
const Menu = require('../models/Menu')

exports.crearMenu = async (req, res) => {
  const errs = validationResult(req)
  if (!errs.isEmpty()) {
    res.status(400).json({ errores: errs.array() })
    return
  }

  try {
    const { nombre } = req.body
    const menuEncontrado = await Menu.findOne({ nombre })
    if (menuEncontrado) {
      res.status(400).json({ msg: 'el menu con ese nombre ya existe' })
      return
    }

    const menuModel = new Menu(req.body)

    await menuModel.save((err, room) => {
      if (err) {
        res.status(400).send({ msg: 'Error al insertar en la base de datos' })
        return
      }
      res.status(201).json({ msg: 'menu ingresado con exito', id: room.id })
    })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

exports.buscarMenus = async (req, res) => {
  try {
    const menus = await Menu.find().populate({ path: 'platos' }).exec()

    if (!menus) {
      res.status(404).json({ msg: 'No se encontraron los menus' })
      return
    }

    res.status(200).json({
      msg: 'Busqueda realizada con exito',
      data: menus,
    })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

exports.buscarMenuID = async (req, res) => {
  try {
    const menus = await Menu.findById(req.params.id)
      .populate({ path: 'platos' })
      .exec()

    if (!menus) {
      res.status(404).json({ msg: 'No se encontraron los menus' })
      return
    }

    res.status(200).json({
      msg: 'Busqueda realizada con exito',
      data: menus,
    })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

exports.modificarMenu = async (req, res) => {
  try {
    let menuEncontrado = await Menu.findById(req.params.id)
    if (!menuEncontrado) {
      res.status(404).json({ msg: 'Menu ha modificar no encontrado' })
      return
    }

    menuEncontrado = await Menu.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    )
    res
      .status(200)
      .json({ msg: 'menu modificado con exito', data: menuEncontrado })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

exports.eliminarMenu = async (req, res) => {
  try {
    const menuEncontrado = await Menu.findById(req.params.id)
    if (!menuEncontrado) {
      res.status(404).json({ msg: 'Menu a eliminar no encontrado' })
      return
    }
    await Menu.findOneAndRemove({ _id: req.params.id })
    res.status(200).json({ msg: 'Menu eliminado con exito' })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}
