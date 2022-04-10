const ProductServices = require("../services/productServices")
const prodServices = new ProductServices()

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

const getDataController = async (req, res) => {
    let data = await prodServices.getServices()
    res.json({data})
}

const getDataControllerId = async (req, res) => {
    let data = await prodServices.getServiceById(req.params.id)
    res.json({data: data})
}

const postDataController = async (req, res) => {
    let data = await prodServices.saveService(req.body)
    // verificarAdmin(res);
    res.json({data: data})
}

const updateDataController = async (req, res) => {
    let id = req.params.id;
    let dato = req.body;
    await prodServices.updateService(id, dato);
    res.send("Actualizado");
}

const deleteDataController = async (req, res) => {
    let id = req.params.id;
    await prodServices.deleteService(id);
    res.send("Eliminado");
}

module.exports = {
    getDataController,
    getDataControllerId,
    postDataController,
    updateDataController,   
    deleteDataController,
}