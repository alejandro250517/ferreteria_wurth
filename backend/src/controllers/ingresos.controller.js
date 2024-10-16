const mongoose = require('mongoose');

const Ingreso = require('../models/Ingreso');
const Inventario = require('../models/Inventario');

const registrarIngreso = async (req, res) => {
  try {
    const { productoId, cantidad_recibida, numero_factura, precio_compra_unitario, costo_total, ubicacion_almacen, usuario, observaciones } = req.body;

    const cantidadNumerica = parseInt(cantidad_recibida, 10)

    const nuevoIngreso = new Ingreso({ productoId, cantidad_recibida: cantidadNumerica, numero_factura, precio_compra_unitario, costo_total, ubicacion_almacen, usuario, observaciones });
    await nuevoIngreso.save();

    let inventario = await Inventario.findOne({ producto: productoId });
    if (inventario) {
      inventario.cantidad += cantidad_recibida;
    } else {
      inventario = new Inventario({ producto: productoId, cantidad: cantidadNumerica });
    }
    await inventario.save();

    res.status(201).json(nuevoIngreso);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const obtenerIngresos = async (req, res) => {
  try {
    const mostrarIngresos = await Ingreso.find().populate('productoId');
    res.status(201).json(mostrarIngresos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { registrarIngreso, obtenerIngresos }