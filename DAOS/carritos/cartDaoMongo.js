const ContenedorMongo = require("../../containers/containerMongo")

class CartDaoMongo extends ContenedorMongo {
    constructor() {
        super('carts', {
            timestamp: {type: Date, default: Date.now},
            products: {type: [], required: true}
        });
    }

    async save(carritos = { products: [] }) {
        return super.save(carritos)
    }
}

module.exports = CartDaoMongo