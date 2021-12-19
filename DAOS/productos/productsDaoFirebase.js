const ContenedorFirebase = require("../../containers/containerFirebase.js");

class ProductsDaoFirebase extends ContenedorFirebase {
    constructor() {
        super('products')
    }
}

export default ProductsDaoFirebase;
