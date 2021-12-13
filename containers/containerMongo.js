const mongoose = require('mongoose');
const config = require('../config.js');
const { asPOJO, renameField, removeField } = require('../utils/objectUtils.js');

await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)

class ContenedorMongo {
    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema)
    }

    async save(obj) {

    }
    async getAll(){

    }
    async getById(id) {

    }
    async deleteId(id) {

    }
    async updateId(id) {

    }
    // async deleteProduct(id, idProduct) {

    // }
    // async addProduct(id, arr) {

    // }

    async desconectar()
}

export default ContenedorMongo