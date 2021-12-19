const mongoose = require('mongoose');
const config = require('../config.js');

await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)

class ContenedorMongo {
    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema)
    }

    async save(obj) {
        try {
            let objeto = await this.coleccion.create(obj)
            return objeto
        } catch (error) {
            throw new Error("Error al guardar el objeto: " + error)
        }
    }
    async getAll(){
        try {
            let objetos = await this.coleccion.find()
            return objetos
        } catch (error) {
            throw new Error("Error al obtener todos los objetos: " + error)
        }
    }
    async getById(id) {
        try {
            let objeto = await this.coleccion.find({ _id: id })
            return objeto
        } catch (error) {
            throw new Error("Error al obtener el objeto: " + error)
        }
    }
    async deleteId(id) {
        try {
            await this.coleccion.deleteOne({ _id: id })
        } catch (error) {
            throw new Error("Error al eliminar el objeto: " + error)
        }
    }
    async updateId(id, obj) {
        try {
            let objeto = await this.findOneAndIpdate({ _id: id }, obj)
            return objeto
        } catch (error) {
            throw new Error("Error al actualizar el objeto: " + error)
        }
    }
    // async deleteProduct(id, idProduct) {

    // }
    // async addProduct(id, arr) {

    // }
}

export default ContenedorMongo