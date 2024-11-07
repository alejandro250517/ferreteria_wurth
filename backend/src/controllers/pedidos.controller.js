const mongoose = require('mongoose');
const Pedido = require('../models/Pedido');
const Inventario = require('../models/Inventario');

const registrarPedido = async (req, res) => {
    try {
      const { productos, cliente } = req.body;
  
      let precioTotalPedido = 0;
      const productosPedido = [];
  
      for (const item of productos) {
        const { productoId, cantidad_pedida, precio_unitario } = item;
        const cantidadNumerica = parseInt(cantidad_pedida, 10);
        const precioTotalProducto = cantidadNumerica * precio_unitario;
        precioTotalPedido += precioTotalProducto;
  
        let inventario = await Inventario.findOne({ producto: productoId });
        if (!inventario || inventario.cantidad < cantidadNumerica) {
          return res.status(400).json({ message: `Cantidad insuficiente en inventario para el producto ${productoId}` });
        }
  
        productosPedido.push({
          productoId,
          cantidad_pedida: cantidadNumerica,
          precio_unitario,
          precio_total: precioTotalProducto,
        });
  
        inventario.cantidad -= cantidadNumerica;
        await inventario.save();
      }
  
      const nuevoPedido = new Pedido({
        productos: productosPedido,
        cliente,
        precio_total: precioTotalPedido,
      });
      await nuevoPedido.save();
  
      res.status(201).json({ message: 'Pedido registrado con éxito', pedido: nuevoPedido });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
const obtenerPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find().populate('productos.productoId');
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const eliminarPedido = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID no válido' });
  }
  try {
    const pedido = await Pedido.findById(id);
    if (!pedido) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }

    // Revertir la cantidad en el inventario
    const inventario = await Inventario.findOne({ producto: pedido.productoId });
    if (inventario) {
      inventario.cantidad += pedido.cantidad_pedida;
      await inventario.save();
    }

    // Eliminar el pedido
    await Pedido.findByIdAndDelete(id);
    res.status(200).json({ message: 'Pedido eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { registrarPedido, obtenerPedidos, eliminarPedido };
