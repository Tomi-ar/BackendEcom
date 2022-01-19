const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const db = require('./db');
const app = express();
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require("../modules/user");
const router = require("../routes/fork");
const user = require('../modules/user');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router)

// MOTOR DE PLANTILLAS ********************************************************
app.set("views", "./views");
app.set("view engine", "ejs");
// MOTOR DE PLANTILLAS ********************************************************

// ENCRIPTAR CONTRASEÑA ********************************************************
const saltRounds = 10;

async function desencriptar(username, pass) {
    let usuario = await User.findOne({"username": username});
    const match = await bcrypt.compare(pass, usuario[0].password);

    if(match) {
        return true;
    }
    return false;
}
// ENCRIPTAR CONTRASEÑA ********************************************************


// SESIONES *******************************************************************
app.use(session({
    secret: process.env.SECRET,
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 10000
    },
    rolling: true,
    resave: true,
    saveUninitialized: false
    })
);
app.use(passport.initialize());
app.use(passport.session());
// SESIONES *******************************************************************


// PASSPORT *******************************************************************
function isValidPassword(user, pass) {
    return bcrypt.compareSync(pass, user.password);
}

const authorize = (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
      return;
    }
    res.redirect("/login");
};


passport.use("local-login",new localStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
            if(err) {
                return done(err);
            }
            if(!user) {
                console.log("Usuario no encontrado");
                return done(null, false)
            }
            if(!isValidPassword(user, password)) {
                console.log("Contraseña incorrecta");
                return done(null, false)
            }
            return done(null, user);
        })
    }) 
)

passport.serializeUser((user, done) => {
    done(null, user.id);
});
  
passport.deserializeUser((id, done) => {
    User.findById(id, done);
});
// PASSPORT *******************************************************************


// RUTAS ********************************************************
app.get("/signup", (req, res) => {
    res.render("signup")
})
app.post("/signup", (req, res) => {
    console.log(req.body);
    let userName = req.body.username;
    let pass = bcrypt.hashSync(req.body.password, saltRounds);

    User.find({username: userName})
    .then((user) => {
        if(user[0].username === userName){
            return res.redirect("/existingUser");
        }        
    })
    .catch((err) => {
        let newUser = {
            username: userName,
            password: pass
        }
        new User(newUser).save()
        return res.render("profile", { user: userName });
    })
})

app.get("/login", (req, res) => {
    res.render("login", { message: false})
})
app.post("/login", 
    passport.authenticate("local-login", { failureRedirect: "/login" }), 
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
app.get("/info", (req,res) => {
    let datos = {
    "argumentos de entrada": process.argv.slice(2),
    "sistema opertativo": process.platform,
    "version de node.js": process.version,
    "rss": process.memoryUsage().rss,
    "path": process.execPath,
    "processId": process.pid,
    "carpeta proyecto": process.cwd(),
    }
    res.json({datos})
})

// app.get("/deleteAll", (req,res) => {
//     User.deleteMany({})
//     .then(() => {res.send("usuarios eliminados");})
// })

// RUTAS ********************************************************



app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})