const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

const products = require('./routes/products');
const cart = require('./routes/cart');
const users = require('./routes/user')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/productos', products);
app.use('/carrito', cart);
app.use('/', users)

app.use(function (req, res, next) {
    res.status(404).send({
        error: -2,
        descripcion: `Ruta ${req.url}, metodo ${req.method} no implementada`,
    });
});

app.listen(PORT, () => {
    console.log('Server running ok on port '+PORT);
})