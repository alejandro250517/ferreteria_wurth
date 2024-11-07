const express = require('express');
const router = express.Router();
const IngresosController = require('../controllers/ingresos.controller')

router.post('/registrar-ingreso', IngresosController.registrarIngreso);
router.get('/obtener-ingresos', IngresosController.obtenerIngresos);
router.put('/actualizar-ingreso/:id', IngresosController.actualizarIngreso);
router.delete('/eliminar-ingreso/:id', IngresosController.eliminarIngreso);


module.exports = router;
