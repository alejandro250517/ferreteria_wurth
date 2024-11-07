const express = require('express')

const router = express.Router();
const InventarioController = require('../controllers/inventario.controller');

router.get('/obtener-inventario', InventarioController.obtenerInventario);

module.exports = router