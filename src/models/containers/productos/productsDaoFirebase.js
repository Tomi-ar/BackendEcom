const ContenedorFirebase = require("../containerFirebase");

class ProductsDaoFirebase extends ContenedorFirebase {
    constructor() {
        super('products')
    }
}

module.exports = ProductsDaoFirebase;
