const { messagesController } = require('../src/models/controllers/socketController')

const express = require("express")
const app = express();
const http = require("http")
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)


io
.of("/chat")
.on("connection", messagesController)


module.exports