const mongoose = require('mongoose');

const IngresoSchema = new mongoose.Schema({
  productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
  cantidad_recibida: { type: Number, required: true },
  numero_factura: { type: Number, required: true },
  precio_compra_unitario: { type: Number, required: true },
  costo_total: { type: Number, required: true },
  ubicacion_almacen: { type: String, required: true },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  observaciones: { type: String, required: true },
},
{
  timestamps: true
});

module.exports = mongoose.model('Ingreso', IngresoSchema);
