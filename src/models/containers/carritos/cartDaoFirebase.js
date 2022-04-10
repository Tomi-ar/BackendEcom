const ContenedorFirebase = require("../containerFirebase")

class CartDaoFirebase extends ContenedorFirebase {
    constructor() {
        super('carts')
    }

    async saveCart(carrito = { products: [] }) {
        return super.save(carrito)
    }
}

module.exports = CartDaoFirebase;