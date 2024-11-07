require('dotenv').config()

const mongoose = require ('mongoose');

const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI)
.then(() => {
    console.log('Conectado a MongoDB Cloud - Wurth');
})
.catch((error) => {
    console.error('No es posible conectar a MongoDB cloud', error);
})
