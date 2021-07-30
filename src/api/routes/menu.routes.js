const express = require('express')
const { check } = require('express-validator')

const authToken = require('../middleware/logeado')
const menuController = require('../controllers/menuController')

const router = express.Router()

router.post(
  '/',
  authToken,

  [check('nombre', 'Nombre del menu es requerido').not().isEmpty()],
  [check('precio', 'Precio del menu es requerido').not().isEmpty()],
  menuController.crearMenu
)

router.put('/:id', authToken, menuController.modificarMenu)

router.delete('/:id', authToken, menuController.eliminarMenu)

router.get('/', authToken, menuController.buscarMenus)
router.get('/:id', authToken, menuController.buscarMenuID)
module.exports = router
