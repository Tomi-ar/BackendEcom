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
            console.log("Problemas con el get "+error);
        }
    }
    async getById(id) {
        try {
            let data = await this.coleccion.find({_id: id});
            return data;
        } catch (error) {
            console.log("ID no encontrado "+error);
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
            console.log("Problemas con el save "+error);
        }
    }
    async updateId(id, product) {
        try {
            let data = this.coleccion.findOneAndUpdate({_id: id}, product)
            return data;
        } catch (error) {
            console.log("Problemas con el update "+error);
        }
    }    
    async deleteId(id) {
        try {
            let data = await this.coleccion.findOneAndRemove({_id: id});
            return data;
        } catch (error) {
            console.log("Problemas con el delete "+error);
        }
    }
}

module.exports = ContenedorMongo