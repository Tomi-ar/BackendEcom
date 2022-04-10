const ContenedorMongo = require("../containerMongo")

class CartDaoMongo extends ContenedorMongo {
    constructor() {
        super('carts', {
            timestamp: {type: Date, default: Date.now},
            products: {type: {} , required: true},
            direccion: {type: String, required: true},
            estado: {type: String, required: true},
        });
    }

    async saveCart(cart) {
        try {
            let newCart = {
                products: {
                    nombre: cart.products.nombre
                },
                direccion: cart.direccion
            };
            let data = await new this.coleccion(newCart).save()
            return data;
        } catch (error) {
            console.log("Problemas con el save "+error);
        }
    }

    // ruta para actualizar un producto dentro del carrito?
}

module.exports = CartDaoMongo