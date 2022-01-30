const { Router } = require('express');
const dotenv = require('dotenv');
dotenv.config();
const numCPUs = require('os').cpus().length
const passport = require('passport');
require("../src/passport")
require('../src/db')
const logger = require('../loggers/logger')
const router = new Router

// RUTAS ********************************************************
router.get("/", (req, res) => {
    res.render("main");
    logger.log("info", `${req.method}-${req.originalUrl}`);
})
router.get("/signup", (req, res) => {
    res.render("signup");
    logger.log("info", `${req.method}-${req.originalUrl}`);
})

router.post("/signup", 
    passport.authenticate("local-signup", { 
        failureRedirect: "/login",
        successRedirect: "/profile"
    })
)
const authorize = (req, res, next) => {
    if (req.isAuthenticated()) {
    next();
    return;
    }
    res.redirect("/login");
};

router.get("/login", (req, res) => {
    res.render("login", { message: false})
    logger.log("info", `${req.method}-${req.originalUrl}`);
})
router.post("/login", 
    passport.authenticate("local-login", { failureRedirect: "/checkPass" }), 
        function(req, res) {
            res.redirect("/profile")
        }
)

router.get("logout", (req,res) => {
    req.logout();
    res.redirect("/login");
    logger.log("info", `${req.method}-${req.originalUrl}`);
})
router.get("/profile", authorize, (req, res) => {
    res.render("profile", {user: req.user.username})
    logger.log("info", `${req.method}-${req.originalUrl}`);
})
router.get("/existingUser", (req, res) => {
    res.render("existingUser")
    logger.log("info", `${req.method}-${req.originalUrl}`);
})
router.get("/checkPass", (req,res) => {
    res.render("checkPass")
    logger.log("info", `${req.method}-${req.originalUrl}`);
})
router.get("/productos", authorize, (req, res) => {
    res.render("productos", {user: req.user.username})
    logger.log("error", new Error("Error en la ruta"));
})
router.get("/info", (req,res) => {
    let datos = {
    "argumentos de entrada": process.argv.slice(2),
    "sistema opertativo": process.platform,
    "version de node.js": process.version,
    "rss": process.memoryUsage().rss,
    "path": process.execPath,
    "processId": process.pid,
    "carpeta proyecto": process.cwd(),
    "numero de procesadores": numCPUs
    }
    console.log(datos);
    res.json({datos})
    logger.log("info", `${req.method}-${req.originalUrl}`);
})
// RUTAS ********************************************************

module.exports = router