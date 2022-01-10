const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/users")
mongoose.connection.on("open", () => {
    console.log("base de datos conectada");
})
mongoose.connection.on("error", () => {
    console.log("Error al abrir la BD");
})