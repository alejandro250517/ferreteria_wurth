const mongoose = require('mongoose');


const usuarioSchema = new mongoose.Schema({
    nombre_completo:{
        type: String,
        required: true
    },
    documento:{
        type: String,
        required: true,
        unique: true,
    },
    telefono:{
        type: String,
        required: true,
    },
    correo:{
        type: String,
        required: true,
        unique: true
    },
    contrasena: {
        type: String,
        required: true
    },
    perfil: {
        type: String,
        Enum: ['Administrador', 'Coordinador', 'Operador']
    },
},
    {
        timestamps: true
    }      
);



module.exports = mongoose.model('Usuario', usuarioSchema);