const express = require('express')
const { check } = require('express-validator')

const authToken = require('../middleware/logeado')
const pedidoController = require('../controllers/pedidoController')

const router = express.Router()

router.post(
  '/',
  authToken,

  [check('reserva', 'Reserva es requerida').not().isEmpty()],
  pedidoController.crearPedido
)

router.put('/:id', authToken, pedidoController.modificarPedido)

router.delete('/:id', authToken, pedidoController.eliminarPedido)
router.get('/reserva/:id', authToken, pedidoController.buscarPedidoReserva)
router.get('/', authToken, pedidoController.buscarPedidos)
router.get('/:id', authToken, pedidoController.buscarPedidoID)
module.exports = router
