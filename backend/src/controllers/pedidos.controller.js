const Pedido = require('../models/Pedido');
const Producto = require('../models/Producto');
const Inventario = require('../models/Inventario');

const registrarPedido = async (req, res) => {
    try {
        const { productos, cliente, telefono, direccion, ciudad, vendedor} = req.body;
    
        if (!productos || productos.length === 0) {
          return res.status(400).json({ error: 'Debe incluir al menos un producto en el pedido' });
        }
    
        // Calcular el total del pedido
        let total = 0;
        const productosDetalles = [];
    
        for (let item of productos) {
          const producto = await Producto.findById(item.productoId);
          if (!producto) {
            return res.status(400).json({ error: `Producto con ID ${item.productoId} no encontrado` });
          }
    
          // Calcular el subtotal para este producto
          const subtotal = producto.precio * item.cantidad;
          total += subtotal;
    
          // Agregar el detalle del producto al array
          productosDetalles.push({
            productoId: producto._id,
            cantidad: item.cantidad,
            precio: producto.precio,
            subtotal: subtotal
          });
        }
    
        // Crear un nuevo pedido con el total calculado y detalles de productos
        const nuevoPedido = new Pedido({
          productos: productosDetalles,
          total: total,
          cliente: cliente,
          telefono: telefono,
          direccion: direccion,
          ciudad: ciudad,
          vendedor: vendedor
        });
    
        await nuevoPedido.save();
    
        // Actualizar el inventario
        for (const item of productos) {
          const inventario = await Inventario.findOne({ producto: item.productoId });
          console.log(`Producto: ${item.productoId}, Cantidad Solicitada: ${item.cantidad}, Cantidad en Inventario: ${inventario ? inventario.cantidad : 'No encontrado'}`);
    
          if (inventario && inventario.cantidad >= item.cantidad) {
            inventario.cantidad -= item.cantidad;
            await inventario.save();
          } else {
            return res.status(400).json({ message: `Stock insuficiente para el producto ${item.productoId}` });
          }
        }
    
        res.status(201).json(nuevoPedido);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

module.exports = {registrarPedido}

