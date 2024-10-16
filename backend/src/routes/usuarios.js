const express = require('express');
const router = express.Router();
const UsuariosController = require('../controllers/auth.controller');

router.get('/obtener-usuarios', UsuariosController.obtenerUsuarios);

module.exports = router;