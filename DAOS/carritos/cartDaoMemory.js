const ContenedorMem = require("../../containers/containerMemory")

class CartDaoMemory extends ContenedorMem {

    async save(carrito = { productos: [] }) {
        return super.save(carrito)
    }
}

module.exports = CartDaoMemory