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
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

// async function encriptar(pass) {
//     bcrypt.genSalt(saltRounds, function(err, salt) {
//         bcrypt.hash(pass, salt, function(err, hash) {

//             console.log(hash);
//         });
//     })
// }

// async function desencriptar(username, pass) {
//     let usuario = await db.User.findOne({"username": username});
//     const match = await bcrypt.compare(pass, usuario.passwordHash);

//     if(match) {
//         return true;
//     }
//     return false;
//     // or 
//     console.log("no match")
// }
// ENCRIPTAR CONTRASEÑA ********************************************************


const { userSchema } = require("../modules/user");
const User = mongoose.model("user", userSchema);

// RUTAS ********************************************************
app.get("/signup", (req, res) => {
    res.render("signup")
})
app.post("/signup", (req, res) => {

    console.log(req.body);
    let userName = req.body.username;
    let pass = req.body.password;

    let match = User.find({"username": userName})

    console.log( match);
    if(match) {
        return res.send({ message: "El usuario ya existe"})
    }
    let newUser = {
        username: userName,
        password: pass
    }
    User.insertMany({newUser})
    console.log(newUser);
    res.send({ message: "Usuario creado"})
    // res.redirect("/profile")
})
app.get("/login", (req, res) => {
    res.render("login")
})

app.get("/profile", (req, res) => {
    res.render("profile")
})



// RUTAS ********************************************************



app.listen(3030, () => {
    console.log('Server is running on port 3030');
})