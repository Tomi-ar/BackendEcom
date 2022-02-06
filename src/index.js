const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
require('./userDB');
require("./passport");
require('../helper/normalize');
const logger = require('../loggers/logger');
const app = express();
const forkRouter = require("../routes/fork");
const router = require('../routes/routes')
const parseArgs = require('minimist');
const compression = require('compression');
const createFaker = require('../helper/faker');

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
        // todo el choclo del socket
    // ************** SOCKET.IO CONECTION ****************************************

    server.listen(process.env.PORT, () => {
        console.log(`Server is running on port: ${process.env.PORT} - pid: ${process.pid}`);
    })
}
// CLUSTER ********************************************************************