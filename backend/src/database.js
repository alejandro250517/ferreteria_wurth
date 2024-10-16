const mongoose = require ('mongoose');

mongoose.connect('mongodb+srv://brayan_cruz:Brayan123..@cluster-jlrb.ocwylvs.mongodb.net/wurth?retryWrites=true&w=majority')
.then(() => {
    console.log('Conectado a MongoDB Cloud - Wurth');
})
.catch((error) => {
    console.error('No es posible conectar a MongoDB cloud');
})