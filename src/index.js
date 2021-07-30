const express = require('express')
const cors = require('cors')

const { config } = require('./config')
const conectarDB = require('./config/lib/mongoose')

// Init
const app = express()
conectarDB(config.dbMongo)

const server = require('http').createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

// Middleware
app.use(cors())
app.use(express.json())

//Routes
app.use('/api/usuario', require('./api/routes/usuario.routes'))
app.use('/api/plato', require('./api/routes/plato.routes'))
app.use('/api/menu', require('./api/routes/menu.routes'))
app.use('/api/mesa', require('./api/routes/mesa.routes'))
app.use('/api/reserva', require('./api/routes/reserva.routes'))
app.use('/api/pedido', require('./api/routes/pedido.routes'))

io.on('connection', (socket) => {
  socket.on('cliente-cocinero', () => {
    socket.broadcast.emit('cliente-cocinero', 'cliente-cocinero')
  })

  socket.on('cocinero-mesero', () => {
    socket.broadcast.emit('cocinero-mesero', 'cocinero-mesero')
  })
})

// Server
server.listen(config.port, function () {
  // eslint-disable-next-line no-console
  console.log(`Listening on port: ${config.port}`)
})
