const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
  codigo: { type: String, required: true},
  nombre: { type: String, required: true, trim: true },
  categoria: { type: String, trim: true },
  descripcion: { type: String, trim: true },
  proveedor: { type: String, required: true},
},
{
  timestamps: true
});

module.exports = mongoose.model('Producto', ProductoSchema);
