const logger = require('../../../../loggers/logger')
const {transporter, mailOrder} = require('../../config/nodeMailer');
const ContenedorFirebase = require("../containerFirebase")

class CartDaoFirebase extends ContenedorFirebase {
    constructor() {
        super('carts')
    }

    async saveCart(carrito = { products: [] }) {
        return super.save(carrito)
    }
    async saveCart(cart) {
        try {
            const saved = await this.coleccion.add(cart);
            return { ...obj, id: saved.id }
        } catch (error) {
            logger.log("error", error.message)
        }
    }
    async addProductToCart(id, dato) {
        try {
            let data = await this.coleccion.doc(id).add({ products: dato })
            return data;
        } catch (error) {
            logger.log("error", error.message)
        }
    }
    async closeCartId(id) {
        try {
            let data = await this.coleccion.doc(id).update({ estado: 'cerrado' })
            let info = await transporter.sendMail(mailOrder)
            return data;
        } catch (error) {
            logger.log("error", error.message)
        }
    }
}

module.exports = CartDaoFirebase;