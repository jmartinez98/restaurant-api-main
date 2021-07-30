const express = require('express')
const { check } = require('express-validator')

const authToken = require('../middleware/logeado')
const reservaController = require('../controllers/reservaController')

const router = express.Router()

router.post(
  '/',
  authToken,

  [check('mesa', 'Mesa de la reserva es requerido').not().isEmpty()],
  [check('usuario', 'Usuario de la reserva es requerido').not().isEmpty()],
  reservaController.crearReserva
)

router.put('/:id', authToken, reservaController.modificarReserva)
router.delete('/:id', authToken, reservaController.eliminarReserva)
router.get('/usuario/:id', authToken, reservaController.buscarReservaUsuario)
router.get('/', authToken, reservaController.buscarReservas)
router.get('/:id', authToken, reservaController.buscarReservaID)

module.exports = router
