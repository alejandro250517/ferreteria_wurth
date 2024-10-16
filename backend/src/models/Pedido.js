const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  productos: [{
    productoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Producto',
      required: true
    },
    cantidad: {
      type: Number,
      required: true
    },
    precio: {
      type: Number,
      required: true
    },
    subtotal: {
      type: Number,
      required: true
    }
  }],
  cliente:{ type: String, required: true},
  telefono: { type: Number, required: true },
  direccion: { type: String, required: true},
  ciudad: { type: String, required: true},
  vendedor: { type: String, required: true},
  total: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Pedido', pedidoSchema);
