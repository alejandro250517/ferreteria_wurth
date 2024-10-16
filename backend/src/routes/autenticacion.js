const express = require('express');
const router = express.Router();

const AutenticacionController = require('../controllers/auth.controller');

router.post('/registrar-usuario', AutenticacionController.registrarUsuario);
router.post('/iniciar-sesion', AutenticacionController.login);


module.exports = router;