const { Schema, model } = require('mongoose')

const PedidoSchema = new Schema(
  {
    reserva: {
      type: Schema.Types.ObjectId,
      ref: 'Reserva',
    },
    pedidos: {
      type: [
        {
          menu: { type: Schema.Types.ObjectId, ref: 'Menu' },
          cantidad: { type: Number },
        },
      ],
    },
    total: {
      type: Number,
    },
  },
  {
    versionKey: false,
  }
)

module.exports = model('Pedido', PedidoSchema)
