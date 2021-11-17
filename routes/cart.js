const express = require('express');
const { Router } = express;

const router = new Router();

const Cart = require("../containers/cart");
const cart = new Cart();
const Product = require("../containers/products");
const product = new Product();

router.post("/", async (req, res) => {
    await cart.save(req.body);
    res.send(`Carrito creado con éxito`);
});
  
router.delete("/:id", async (req, res) => {
    await cart.deleteId(req.params.id);
    res.send(`Carrito ${req.params.id} borrado`);
});

router.get("/:id/productos", async (req, res) => {
    res.send(await cart.getById(req.params.id));
});

router.post("/:id/productos", async (req, res) => {
    await cart.addProduct(req.params.id, req.body);
    res.send("Producto agregado al carrito");
});

router.delete("/:id/productos/:idProd", async (req, res) => {
    await cart.deleteProduct(req.params.id, req.params.idProd);
    res.send("Producto eliminado del carrito");
});

module.exports = router;