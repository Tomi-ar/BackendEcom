const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
require('./routes/socket')
const logger = require('./loggers/logger')

const PORT = process.env.PORT || 8080;
const app = express();

const products = require('./routes/products');
const cart = require('./routes/cart');
const users = require('./routes/user')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MOTOR DE PLANTILLAS ********************************************************
app.set("views", "./views");
app.set("view engine", "ejs");
// MOTOR DE PLANTILLAS ********************************************************


app.use('/productos', products);
app.use('/carrito', cart);
app.use('/', users)

app.use(function (req, res, next) {
    res.status(404).send({
        error: -2,
        descripcion: `Ruta ${req.url}, metodo ${req.method} no implementada`,
    });
    logger.log("warn", `status: 400, error: Not Found - ${req.originalUrl} - ${req.method}`);

});

app.listen(PORT, () => {
    console.log('Server running ok on port '+PORT);
})