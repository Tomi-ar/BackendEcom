const ContenedorFS = require("../../containers/containerFS.js");

class ProductsDaoFS extends ContenedorFS {
    constructor() {
        super('products.txt')
    }

    async save(carrito = { productos: [] }) {
        return super.guardar(carrito)
    }
}

export default ProductsDaoFS;