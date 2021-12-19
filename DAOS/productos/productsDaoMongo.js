const ContenedorMongo = require("../../containers/containerMongo")

class ProductsDaoMongo extends ContenedorMongo {
    constructor() {
        super('products', {
            timestamp: {type: Date, default: Date.now},
            nombre: {type: String, required: true},
            descripcion: {type: String, required: true},
            codigo: {type: String, required: true},
            thumb: {type: String, required: true},
            precio: {type: Number, required: true},
            stock: {type: Number, required: true}
        });
    }
}

export default ProductsDaoMongo