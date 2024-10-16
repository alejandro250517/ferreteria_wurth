const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
  codigo: { type: String, required: true},
  nombre: { type: String, required: true, trim: true },
  categoria: { type: String, trim: true },
  descripcion: { type: String, trim: true },
  proveedor: { type: String, required: true},
  precio_compra: { type: Number, required: true, min: 0 },
  precio_venta: { type: Number, required: true, min: 0 },
  cantidad: { type: Number, required: true, min: 0 },
  stock_inicial: { type: Number, required: true, min: 0 },
  estado: { type: String, enum:['Activo', 'Inactivo']},
},
{
  timestamps: true
});

module.exports = mongoose.model('Producto', ProductoSchema);
