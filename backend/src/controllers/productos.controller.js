const mongoose = require('mongoose');

const Producto = require('../models/Producto');

const registrarProducto = async (req, res) => {
    const productoNuevo = new Producto(req.body);
    try {
        const guardarProducto = await productoNuevo.save();
        res.status(201).json(guardarProducto);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const obtenerProductos = async (req, res) => {
    try {
        const mostrarProductos = await Producto.find();
        res.status(200).json(mostrarProductos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const actualizarProducto = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID no válido' });
    }
    try {
        const modificarProducto = await Producto.findByIdAndUpdate(id, req.body, { new: true });
        if (!modificarProducto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json(modificarProducto);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const eliminarProducto = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID no válido' });
    }
    try {
        const borrarProducto = await Producto.findByIdAndDelete(id);
        if (!borrarProducto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json(borrarProducto); // Cambiar a 200 para eliminación
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = { registrarProducto, obtenerProductos, actualizarProducto, eliminarProducto };