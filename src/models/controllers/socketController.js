const logger = require('../../../loggers/logger')
const MessageService = require('../services/socketServices')
const messageController = new MessageService()

const messagesController = async (socket) => {
    logger.log("info", `Nuevo id:${socket.id} -Conectado`);
    console.log("New connection");
    socket.emit("Messages", await messageController.emitMsgService())

    socket.on("message_client", (data) =>{
        return data;
    })
    socket.on("updateConfirm", () => {
        logger.log("info", `Mensajes Socket actualizados`);
    })

    socket.on("dataText", async (dataObj) => {
        await messageController.saveMsgService(dataObj)
        io.of("/chat").emit("Messages", await messageController.emitMsgService());
    })
}

module.exports = { messagesController }