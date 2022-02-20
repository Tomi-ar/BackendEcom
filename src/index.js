const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
require('./userDB');
require('../helper/normalize');
const logger = require('../loggers/logger');
const app = express();
const forkRouter = require("../routes/fork");
const router = require('../routes/routes')
const parseArgs = require('minimist');
const compression = require('compression');
const createFaker = require('../helper/faker');
const fs = require('fs');
const moment = require('moment');

// ******************* SOCKET.IO CONFIG ***************************************
const http = require("http")
const server = http.createServer(app)
const { Server } = require("socket.io");
const io = new Server(server)
app.use(express.static(__dirname+"/public"))
// ******************* SOCKET.IO CONFIG ***************************************


// CLUSTER ********************************************************************
const cluster = require("cluster");
const numCPUs = require('os').cpus().length
const options = {
    default: {
        mode: "fork"
    }
}
const args = parseArgs(process.argv.slice(2), options).mode
// console.log(args);
if(args=="cluster" && cluster.isMaster) {
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', ()=>{
        console.log(`Process pid ${process.pid} ended`);
    })

} else {

    // MOTOR DE PLANTILLAS ********************************************************
    app.set("views", "./views");
    app.set("view engine", "ejs");
    // MOTOR DE PLANTILLAS ********************************************************

    // MIDDLEWARES ****************************************************************
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/api", forkRouter)
    app.use("/", router)
    app.use(compression())

    app.use(function(err, req, res, next) {
        logger.log("warn", `status: 400, error: Not Found - ${err.message} - ${req.originalUrl} - ${req.method}`);
        res.status(err.status || 500);
        res.render('error')
    })
    // MIDDLEWARES ****************************************************************

    // ************** SOCKET.IO CONECTION ****************************************
    // io.on("connection", (socket) => {
    //     console.log("Cliente conectado");
    //     fs.readFile("../db/Comms.txt", "utf-8", (err,data) => {
    //         let info = JSON.parse(data);
    //         const normalized = normalize(info, postSchema);
    //         socket.emit("message_rta_normlz", normalized)
    //     })
    //     createFaker();
    //     fs.readFile("../db/arrProds.txt", "utf-8", (err,data) => {        
    //         let info = JSON.parse(data);
    //         socket.emit("arrUpdated", info)
    //     })
       
    //     socket.on("dataText", (dataObj) => {
    //         fs.readFile("../db/Comms.txt", "utf-8", (err,data) => {
    //             let dataFile = JSON.parse(data);
    //             let listaMensajes = dataFile.mensajes;
    //             let newDateTime = moment().format("DD/MM/YYYY HH:mm:ss");
    //             let newCom = {
    //                 author: {
    //                     id: dataObj.id,
    //                     nombre: dataObj.name,
    //                     apellido: dataObj.lastname,
    //                     edad: dataObj.age,
    //                     alias: dataObj.alias,
    //                     avatar: dataObj.avatar
    //                 },
    //                 text: dataObj.text,
    //                 dateTime: newDateTime
    //             }
    
    //             listaMensajes.push(newCom);
    //             // console.log(listaMensajes);
    //             fs.writeFile("../db/Comms.txt", JSON.stringify(dataFile, null, 2), (err) => {
    //                 console.log("Comentario guardado");
    
    //                 const normalized = normalize(dataFile, postSchema);
    //                 io.sockets.emit("message_rta_normlz", normalized)
    //             })
    //         })
    //     })
          
    //     socket.on("mensaje_cliente", (data) =>{
    //         console.log(data);
    //     })
    
    //     socket.on("newProd", (dataObj) => {
    //         fs.readFile("../db/arrProds.txt", "utf-8", (err,data) => {
    //             let dataFile = JSON.parse(data)
    //             let items = dataFile.length;
    //             let id = parseInt(dataFile[items - 1].id) + 1;
    //             let newProd = {
    //                     nombre: dataObj.nombre,
    //                     precio: dataObj.precio,
    //                     thumb: dataObj.thumb,
    //                     id: id
    //                 }
                
    //             dataFile.push(newProd)
    //             // console.log(dataFile);
    //             fs.writeFile("../db/arrProds.txt", JSON.stringify(dataFile, null, 2), (err,data) =>{
    //                 console.log("Producto guardado!");
    //                 io.sockets.emit("arrUpdated", dataFile)
    //             })
    //         })
    //     })
    //     socket.on("updateConfirm", () => {
    //         console.log("Actualizado");
    //     })
    // })
    // ************** SOCKET.IO CONECTION ****************************************

    server.listen(process.env.PORT, () => {
        console.log(`Server is running on port: ${process.env.PORT} - pid: ${process.pid}`);
    })
}
// CLUSTER ********************************************************************

// UN ESQUEMA PARA USUARIOS, UNO PARA PRODUCTOS Y UNO PARA CARRITOS
// POPULATE EN MONGOOSE PARA ASOCIAR LOS ESQUEMAS?