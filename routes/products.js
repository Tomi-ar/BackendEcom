const express = require('express');
const { Router } = express;

const router = new Router();

const administrador = false;
const msjError = {
    error: -1,
    mensaje: "usuario sin privilegios",
};
const verificarAdmin = (res) => {
    if (!administrador) {
    res.send(msjError);
    }
};

const Product = require("../containers/products");
const product = new Product();

router.get("/:id", async (req, res) => {
  res.send(await product.getById(req.params.id));
});

router.post("/", async (req, res) => {
  if (req.query.admin === "true") {
    await product.save(req.body);
    res.send("Producto guardado con éxito");
  }
  verificarAdmin(res);
});

router.put("/:id", async (req, res) => {
  if (req.query.admin === "true") {
    console.log(req.params.id);
    console.log(req.body);
    await product.updateId(req.params.id, req.body);
    res.send("Producto actualizado con éxito");
  }
  verificarAdmin(res);
});

router.delete("/:id", async (req, res) => {
  if (req.query.admin === "true") {
    await product.deleteId(req.params.id);
    res.send("Producto eliminado con éxito");
  }
  verificarAdmin(res);
});

module.exports = router;