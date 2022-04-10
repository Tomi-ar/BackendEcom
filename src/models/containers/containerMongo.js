const logger = require('../../../loggers/logger')
const mongoose = require('mongoose');
const MongoClient = require('../config/mongoDB');

let instanceProdMongo = []

class ContenedorMongo {
    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema);
        this.value = Math.random()
        this.mongoClient = new MongoClient
        this.mongoClient.connect()
    }

    //**************************** SINGLETON ****************************** */
    static getInstance() {
        if(!instanceProdMongo){
            instanceProdMongo = new ContenedorMongo()
        }
        return instanceProdMongo
    }
    //**************************** SINGLETON ****************************** */
    
    async getAll() {
        try {
            let data = await this.coleccion.find({});
            return data;
        } catch (error) {
            logger.log("error", error.message)
        }
    }
    async getById(id) {
        try {
            let data = await this.coleccion.find({_id: id});
            if (data.length == 0) {
                logger.log("error", error.message)
            } else {
                return data;
            }
        } catch (error) {
            logger.log("error", error.message)
        }
    }
    async save(product) {
        try {
            let newProd = {
                nombre: product.nombre,
                descripcion: product.descripcion,
                codigo: product.codigo,
                thumb: product.thumb,
                precio: product.precio,
                stock: product.stock
            };
            let data = await new this.coleccion(newProd).save()
            return data;
        } catch (error) {
            logger.log("error", error.message)
        }
    }
    async updateId(id, product) {
        try {
            let data = this.coleccion.findOneAndUpdate({_id: id}, product)
            return data;
        } catch (error) {
            logger.log("error", error.message)
        }
    }    
    async deleteId(id) {
        try {
            let data = await this.coleccion.findOneAndRemove({_id: id});
            return data;
        } catch (error) {
            logger.log("error", error.message)
        }
    }
    async getMessages() {
        try {
            let msgs = await this.coleccion.find({});
            return msgs;
        } catch (error) {
            logger.log("error", error.message)
        }
    }
    async saveMessage(msg) {
        try {
            let newMsg = {
                username: msg.username,
                tipo: msg.tipo,
                mensaje: msg.mensaje
            };
            let data = await new this.coleccion(newMsg).save()
            return data;
        } catch (error) {
            logger.log("error", error.message)
        }
    }
}

module.exports = ContenedorMongo