const ContenedorFirebase = require("../../containers/containerFirebase")

class CartDaoFirebase extends ContenedorFirebase {
    constructor() {
        super('carts')
    }

    async save(carrito = { products: [] }) {
        return super.save(carrito)
    }
}

module.exports = CartDaoFirebase;