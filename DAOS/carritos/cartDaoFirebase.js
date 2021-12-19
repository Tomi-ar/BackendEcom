const ContenedorFirebase = require("../../containers/containerFirebase")

class CartDaoFirebase extends ContenedorFirebase {
    constructor() {
        super('carts')
    }

    async save(carrito = { products: [] }) {
        return super.save(carrito)
    }
}

export default CartDaoFirebase;