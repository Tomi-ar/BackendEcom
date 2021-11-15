const express = require('express');
const products = require('./routes/products');
const cart = require('./routes/cart');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/productos', products);
app.use('/carrito', cart);

app.listen(PORT, () => {
    console.log('Server running ok on port '+PORT);
})