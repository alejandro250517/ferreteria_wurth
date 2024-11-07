const mongoose = require('mongoose');

const InventarioSchema = new mongoose.Schema({
  producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
  cantidad: { type: Number, required: true, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Inventario', InventarioSchema);
