const express = require('express');
const router = express.Router();
const IngresosController = require('../controllers/ingresos.controller')

router.post('/registrar-ingreso', IngresosController.registrarIngreso);
router.get('/obtener-ingresos', IngresosController.obtenerIngresos);


module.exports = router;
