const express = require('express');
const cors = require('cors');

const app = express();

require('./database');

//Importacion de rutas

app.use(cors());
app.use(express.json());

//API
app.use('/api/productos', require('./routes/productos'));
app.use('/api/ingresos', require('./routes/ingresos'));
app.use('/api/inventario', require('./routes/inventario'));
app.use('/api/pedidos', require('./routes/pedidos'));
app.use('/api/autenticacion', require('./routes/autenticacion'));
app.use('/api/usuarios', require('./routes/usuarios'));



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Servidor inicializado en puerto ${port}');
});