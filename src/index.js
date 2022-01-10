const express = require('express');
require('./db');

const app = express();

// MOTOR DE PLANTILLAS ********************************************************
app.set("views", "./views");
app.set("view engine", "ejs");
// MOTOR DE PLANTILLAS ********************************************************


// RUTAS ********************************************************
app.post("/signup", (req, res) => {

    console.log(req.body);
    let (username, password) = req.body

    let user = db.users.find({"username": username})
    if(user) {
        return res.send({ message: "El usuario ya existe"})
    }
    let newUser = {
        username: username,
        password: password
    }
    db.users.insertOne(newUser)
    console.log(newUser);
    res.redirect("/profile")
})
app.get("/login", (req, res) => {
    res.render("login")
})
app.get("/signup", (req, res) => {
    res.render("signup")
})
app.get("/profile", (req, res) => {
    res.render("profile")
})





// RUTAS ********************************************************



app.listen(3030, () => {
    console.log('Server is running on port 3030');
})