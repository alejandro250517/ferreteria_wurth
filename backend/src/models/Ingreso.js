const mongoose = require('mongoose');

const IngresoSchema = new mongoose.Schema({
  productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
  cantidad_ingresada: { type: Number, required: true },
  fecha_ingreso: { type: Date, required: true },
  proveedor: { type: String, required: true },
  precio_unitario: { type: Number, required: true },
  precio_total: { type: Number, required: true }
},
{
  timestamps: true
});

module.exports = mongoose.model('Ingreso', IngresoSchema);
