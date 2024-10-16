const express = require('express');
const router = express.Router();
const ProductosController = require('../controllers/productos.controller');

//Rutas

router.post('/registrar-producto', ProductosController.registrarProducto);
router.get('/obtener-productos', ProductosController.obtenerProductos);
router.put('/actualizar-producto/:id', ProductosController.actualizarProducto);
router.delete('/eliminar-producto/:id', ProductosController.eliminarProducto);

module.exports = router;
