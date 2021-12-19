const ContenedorMem = require("../../containers/containerMemory")

class CartDaoMemory extends ContenedorMem {

    async save(carrito = { productos: [] }) {
        return super.save(carrito)
    }
}

export default CartDaoMemory