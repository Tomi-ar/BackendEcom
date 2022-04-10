const logger = require('../../../loggers/logger')
const CartServices = require("../services/cartServices")
const cartServices = new CartServices()

const getCartController = async (req, res) => {
    let data = await cartServices.getServices()
    res.json({data})
    logger.log("info", `${req.method}-${req.originalUrl}`);
}

const getCartControllerId = async (req, res) => {
    let data = await cartServices.getServiceById(req.params.id)
    res.json({data: data})
    logger.log("info", `${req.method}-${req.originalUrl}`);
}

const postCartController = async (req, res) => {
    let data = await cartServices.saveService(req.body)
    res.json({data: data})
    logger.log("info", `${req.method}-${req.originalUrl}`);
}

const addProdController = async (req, res) => {
    let id = req.params.id;
    let dato = req.body;
    await cartServices.addProdService(id, dato);
    res.send("Producto agregado");
    logger.log("info", `${req.method}-${req.originalUrl}`);
}

const updateCartController = async (req, res) => {
    let id = req.params.id;
    let dato = req.body;
    await cartServices.updateService(id, dato);
    res.send("Actualizado");
    logger.log("info", `${req.method}-${req.originalUrl}`);
}

const deleteCartController = async (req, res) => {
    let id = req.params.id;
    await cartServices.deleteService(id);
    res.send("Eliminado");
    logger.log("info", `${req.method}-${req.originalUrl}`);
}

const closeCartController = async (req, res) => {
    let id = req.params.id;
    await cartServices.closeService(id);
    res.send("Cerrado");
    logger.log("info", `${req.method}-${req.originalUrl}`);
}

module.exports = {
    getCartController,
    getCartControllerId,
    postCartController,
    addProdController,
    updateCartController,   
    deleteCartController,
    closeCartController
}