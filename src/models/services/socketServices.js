const MessagesMongo = require('../containers/mensajes/messageMongoDB')

let instanceMsjService = []

class MessageService{
    constructor(){
        this.messageServMongo = new MessagesMongo()
        this.value = Math.random()
    }

    //**************************** SINGLETON ****************************** */
    static getInstance() {
        if(!instanceMsjService){
            instanceMsjService = new productServices()
        }
        return instanceMsjService
    }
    //**************************** SINGLETON ****************************** */
    
    async emitMsgService(){
        let msgs = await this.messageServMongo.getMessages()
        return msgs
    }
    async saveMsgService(dataObj){
        let msg = await this.messageServMongo.saveMessage(dataObj)
        return msg
    }
}

module.exports = MessageService