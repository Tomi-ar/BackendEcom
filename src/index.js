const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
require('./db');
require("./passport");
const app = express();
const session = require('express-session');
const passport = require('passport');
const router = require("../routes/fork");
const parseArgs = require('minimist');

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
    app.use("/api", router)
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


    // RUTAS ********************************************************
    app.get("/signup", (req, res) => {
        res.render("signup")
    })
    app.post("/signup", 
        passport.authenticate("local-signup", { 
            failureRedirect: "/login",
            successRedirect: "/profile"
        })
        // console.log(req.body);
        // let userName = req.body.username;
        // let pass = bcrypt.hashSync(req.body.password, saltRounds);

        // User.find({username: userName})
        // .then((user) => {
        //     if(user[0].username === userName){
        //         return res.redirect("/existingUser");
        //     }        
        // })
        // .catch((err) => {
        //     let newUser = {
        //         username: userName,
        //         password: pass
        //     }
        //     new User(newUser).save()
        //     return res.render("profile", { user: userName });
        // })
    )

    const authorize = (req, res, next) => {
        if (req.isAuthenticated()) {
        next();
        return;
        }
        res.redirect("/login");
    };

    app.get("/login", (req, res) => {
        res.render("login", { message: false})
    })
    app.post("/login", 
        passport.authenticate("local-login", { failureRedirect: "/checkPass" }), 
            function(req, res) {
                res.redirect("/profile")
            }
        // console.log(req.body);
        // let userName = req.body.username;
        // let pass = req.body.password;

        // User.find({username: userName})
        // .then((user) => {
        //     if (user[0].username === userName && desencriptar(userName, pass)) {
        //         return res.render("profile", { user: userName });
        //     } else {
        //         return res.render("login", { message: "Usuario o contraseña incorrectos" });
        //     }
        // })
        // .catch((err) => {
        //     return res.render("login", { message: "Usuario no encontrado"})
        // })
    )

    app.get("logout", (req,res) => {
        req.logout();
        res.redirect("/login");
    })
    app.get("/profile", authorize, (req, res) => {
        res.render("profile", {user: req.user.username})
    })
    app.get("/existingUser", (req, res) => {
        res.render("existingUser")
    })
    app.get("/checkPass", (req,res) => {
        res.render("checkPass")
    })
    app.get("/info", (req,res) => {
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
        res.json({datos})
    })

    // app.get("/deleteAll", (req,res) => {
    //     User.deleteMany({})
    //     .then(() => {res.send("usuarios eliminados");})
    // })

    // RUTAS ********************************************************


    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port: ${process.env.PORT} - pid: ${process.pid}`);
    })
}
// CLUSTER ********************************************************************