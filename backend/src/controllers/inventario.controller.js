const mongoose = require('mongoose');

const Inventario = require('../models/Inventario');

const obtenerInventario = async (req, res) => { 
    try {
        const inventario = await Inventario.find().populate('producto');
        res.status(200).json(inventario);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports = { obtenerInventario }