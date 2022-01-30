const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
require('./db');
require("./passport");
const logger = require('../loggers/logger');
const app = express();
const session = require('express-session');
const passport = require('passport');
const forkRouter = require("../routes/fork");
const router = require('../routes/routes')
const parseArgs = require('minimist');
const compression = require('compression');

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
        logger.log("error", `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method}`);
        res.status(err.status || 500);
        res.render('error')
    })
    // MIDDLEWARES ****************************************************************

    // SESIONES *******************************************************************
    app.use(session({
        secret: process.env.SECRET,
        cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 10*60*1000
        },
        rolling: true,
        resave: true,
        saveUninitialized: true
        })
    );
    app.use(passport.initialize());
    app.use(passport.session());
    // SESIONES *******************************************************************

    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port: ${process.env.PORT} - pid: ${process.pid}`);
    })
}
// CLUSTER ********************************************************************