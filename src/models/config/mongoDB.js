const mongosee = require("mongoose");
const config = require("./config.js");

class MongoClient{
    constructor(){
        this.client = mongosee
    }

    async connect(){
        try {
            this.client.connect(config.mongodb.cnxStr, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            console.log("MongoDB conectado");
        } catch (error) {
            throw "Error al conectar con MongoDB"
        }
    }

    async disconnect(){
        try {
            await this.client.close()
            console.log("MongoDB desconectado");
        } catch (error) {
            throw "Error al desconectar con MongoDB"
        }
    }
}

module.exports = MongoClient;