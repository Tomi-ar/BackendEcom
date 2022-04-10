const ContenedorMongo = require("../containerMongo")

class MessagesMongo extends ContenedorMongo {
    constructor() {
        super('mensajes', {
            username: {
                type: String,
                required: true,
                unique: true,
                allowNull: false
            },
            tipo: {
                type: String,
                enum: ['user', 'system'],
                default: 'user',
                allowNull: false
            },
            mensaje: {
                type: String,
                required: true,
                allowNull: false
            },  
            timestamp: {
                type: Date, 
                default: Date.now
            },
        });
    }
}

module.exports = MessagesMongo