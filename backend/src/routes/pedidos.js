const express = require('express');
const router = express.Router();


const PedidosControllers = require('../controllers/pedidos.controller');

router.post('/registrar-pedido', PedidosControllers.registrarPedido);

module.exports = router;
