const express = require('express')
const { check } = require('express-validator')

const authToken = require('../middleware/logeado')
const platoController = require('../controllers/PlatoController')

const router = express.Router()

router.post(
  '/',
  authToken,

  [check('nombre', 'Nombre del plato es requerido').not().isEmpty()],
  platoController.crearPlato
)

router.put(
  '/:id',
  authToken,

  platoController.modificarPlato
)

router.delete(
  '/:id',
  authToken,

  platoController.eliminarPlato
)

router.get('/', authToken, platoController.buscarPlatos)

module.exports = router
