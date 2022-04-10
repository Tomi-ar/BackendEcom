const CartServices = require("../services/cartServices")
const cartServices = new CartServices()

const getCartController = async (req, res) => {
    let data = await cartServices.getServices()
    res.json({data})
}

const getCartControllerId = async (req, res) => {
    let data = await cartServices.getServiceById(req.params.id)
    res.json({data: data})
}

const postCartController = async (req, res) => {
    let data = await cartServices.saveService(req.body)
    res.json({data: data})
}

const updateCartController = async (req, res) => {
    let id = req.params.id;
    let dato = req.body;
    await cartServices.updateService(id, dato);
    res.send("Actualizado");
}

const deleteCartController = async (req, res) => {
    let id = req.params.id;
    await cartServices.deleteService(id);
    res.send("Eliminado");
}

module.exports = {
    getCartController,
    getCartControllerId,
    postCartController,
    updateCartController,   
    deleteCartController,
}