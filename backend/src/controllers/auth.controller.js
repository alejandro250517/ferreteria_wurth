const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registrarUsuario = async (req, res) => {
    try{                        
        const { nombre_completo, documento, telefono, correo, contrasena, perfil } = req.body;
        const hashcontrasena = await bcrypt.hash(contrasena, 10);
        const usuario = new Usuario({ nombre_completo, documento, telefono, correo, contrasena: hashcontrasena, perfil });
        await usuario.save();        
        res.status(201).json(usuario);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

const login = async (req, res) => {
    try{
        const { correo, contrasena } = req.body;
        const usuario = await Usuario.findOne({ correo });
        if (usuario) {
            const contrasenaCompartida = await bcrypt.compare(contrasena, usuario.contrasena);
            if (contrasenaCompartida) {
                const token = jwt.sign({ id: usuario._id }, 'secreto', { expiresIn: '1h' });
                res.status(201).json({ token });
            } else {
                res.status(401).json({ message: 'Contraseña incorrecta' });
            }
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    }catch(error){
        res.status(500).json({message: error.message});
    }
}   

const obtenerUsuarios = async (req, res) => {
    try{
        const usuarios = await Usuario.find();
        res.status(201).json(usuarios);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

module.exports = { registrarUsuario, login, obtenerUsuarios }