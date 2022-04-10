const logger = require('../../../../loggers/logger')
const {transporter, mailOrder} = require('../../config/nodeMailer');
const ContenedorMongo = require("../containerMongo")

class CartDaoMongo extends ContenedorMongo {
    constructor() {
        super('carts', {
            timestamp: {type: Date, default: Date.now},
            username: {type: String, required: true, unique: true, allowNull: false},
            products: {type: {} , required: true},
            direccion: {type: String, required: true},
            estado: {type: String, enum: ['abierto', 'cerrado'], default: 'abierto', required: true},
        });
    }

    async saveCart(cart) {
        try {
            let newCart = {
                username: cart.username,
                products: {
                    nombre: cart.products.nombre
                },
                direccion: cart.direccion
            };
            let data = await new this.coleccion(newCart).save()
            return data;
        } catch (error) {
            logger.log("error", error.message)
        }
    }
    async addProductToCart(id, dato) {
        try {
            let data = await this.coleccion.findByIdAndUpdate(id, {$push: {products: dato}})
            return data;
        } catch (error) {
            logger.log("error", error.message)
        }
    }
    async closeCartId(id) {
        try {
            let data = await this.coleccion.findByIdAndUpdate(id, {$set: {estado: 'cerrado'}})
            let info = await transporter.sendMail(mailOrder)
            logger.log("info", `Email de signup enviado a ${username}`);
            return data;
        } catch (error) {
            logger.log("error", error.message)
        }
    }
}

module.exports = CartDaoMongo