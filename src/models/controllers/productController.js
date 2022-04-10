const logger = require('../../../loggers/logger')
const ProductServices = require("../services/productServices")
const prodServices = new ProductServices()

const getDataController = async (req, res) => {
    let data = await prodServices.getServices()
    res.json({data})
    logger.log("info", `${req.method}-${req.originalUrl}`);
}

const getDataControllerId = async (req, res) => {
    let data = await prodServices.getServiceById(req.params.id)
    res.json({data: data})
    logger.log("info", `${req.method}-${req.originalUrl}`);
}

const postDataController = async (req, res) => {
    let data = await prodServices.saveService(req.body)
    // verificarAdmin(res);
    res.json({data: data})
    logger.log("info", `${req.method}-${req.originalUrl}`);
}

const updateDataController = async (req, res) => {
    let id = req.params.id;
    let dato = req.body;
    await prodServices.updateService(id, dato);
    res.send("Actualizado");
    logger.log("info", `${req.method}-${req.originalUrl}`);
}

const deleteDataController = async (req, res) => {
    let id = req.params.id;
    await prodServices.deleteService(id);
    res.send("Eliminado");
    logger.log("info", `${req.method}-${req.originalUrl}`);
}

module.exports = {
    getDataController,
    getDataControllerId,
    postDataController,
    updateDataController,   
    deleteDataController,
}