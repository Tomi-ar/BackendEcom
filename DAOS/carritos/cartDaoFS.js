const ContenedorFS = require("../../containers/containerFS")

class CartDaoFS extends ContenedorFS {
    constructor() {
        super('cart.txt');
    }
}

export default CartDaoFS;