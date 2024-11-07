const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({
  productos: [
    {
      productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventario', required: true },
      cantidad_pedida: { type: Number, required: true },
      precio_unitario: { type: Number, required: true },
      precio_total: { type: Number, required: true }
    }
  ],
  cliente: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
  precio_total: { type: Number, required: true }
})  

module.exports = mongoose.model('Pedido', PedidoSchema);
