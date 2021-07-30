const express = require('express')
const { check } = require('express-validator')

const authToken = require('../middleware/logeado')
const mesaController = require('../controllers/mesaController')

const router = express.Router()

router.post(
  '/',
  authToken,

  [check('numero', 'Nombre del mesa es requerido').not().isEmpty()],
  mesaController.crearMesa
)

router.put('/:id', authToken, mesaController.modificarMesa)
router.delete('/:id', authToken, mesaController.eliminarMesa)
router.get('/', authToken, mesaController.buscarMesas)

module.exports = router
