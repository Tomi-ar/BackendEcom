const express = require('express');
const mongoose = require('mongoose');
const db = require('./db');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MOTOR DE PLANTILLAS ********************************************************
app.set("views", "./views");
app.set("view engine", "ejs");
// MOTOR DE PLANTILLAS ********************************************************

// ENCRIPTAR CONTRASEÑA ********************************************************
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function desencriptar(username, pass) {
    let usuario = await User.findOne({"username": username});
    const match = await bcrypt.compare(pass, usuario[0].password);

    if(match) {
        return true;
    }
    return false;
    // or 
    // console.log("no match")
}
// ENCRIPTAR CONTRASEÑA ********************************************************

const User = require("../modules/user");
const { hash } = require('bcrypt');

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
app.post("/login", (req,res) => {
    console.log(req.body);
    let userName = req.body.username;
    let pass = req.body.password;

    User.find({username: userName})
    .then((user) => {
        if (user[0].username === userName && desencriptar(userName, pass)) {
            return res.render("profile", { user: userName });
        } else {
            return res.render("login", { message: "Usuario o contraseña incorrectos" });
        }
    })
    .catch((err) => {
        return res.render("login", { message: "Usuario no encontrado"})
    })
})


app.get("/profile", (req, res) => {
    res.render("profile", {user: false})
})
app.get("/existingUser", (req, res) => {
    res.render("existingUser")
})

// app.get("/deleteAll", (req,res) => {
//     User.deleteMany({})
//     .then(() => {res.send("usuarios eliminados");})
// })

// RUTAS ********************************************************



app.listen(3030, () => {
    console.log('Server is running on port 3030');
})