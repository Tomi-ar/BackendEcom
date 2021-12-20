const express = require('express');
const { Router } = express;

const router = new Router();

// import { productDAO as Product, cartDAO as Cart } from '../DAOS/index';
const cart = require("../DAOS/index").cartDAO;
const product = require("../DAOS/index").productDAO;

router.get("/", async (req,res) => {
    res.send(await cart.getAll())
})

router.post("/", async (req, res) => {
    await cart.save();
    res.send(`Carrito creado con éxito`);
});
  
router.delete("/:id", async (req, res) => {
    await cart.deleteId(req.params.id);
    res.send(`Carrito ${req.params.id} borrado`);
});

router.get("/:id/productos", async (req, res) => {
    const carrito = await cart.getById(req.params.id);
    res.send(carrito.products)
});

router.post("/:id/productos", async (req, res) => {
    const carrito = await cart.getById(req.params.id);
    const producto = await product.getById(req.body.id);
    carrito.products.push(producto);
    await cart.updateId(req.params.id, carrito);
    res.send("Producto agregado al carrito");
});

router.delete("/:id/productos/:idProd", async (req, res) => {
    const carrito = await cart.getById(req.params.id);
    const index = carrito.products.findIndex(p => p.id == req.params.idProd)
    if (index != -1) {
        carrito.products.splice(index, 1)
        await cart.updateId(req.params.id, carrito)
        res.send("Producto eliminado del carrito")
    }
    res.end();
});

module.exports = router;