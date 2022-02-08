const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://Tomas:t4VMECAcMAvPYNN@ecommerceatlas.80zrg.mongodb.net/ecommerceAtlas?retryWrites=true&w=majority")
mongoose.connection.on("open", () => {
    console.log("base de datos conectada");
})
mongoose.connection.on("error", () => {
    console.log("Error al abrir la BD");
})


// const session = require("express-session")
// const cookieParser = require("cookie-parser")
// const MongoStore = require("connect-mongo")
// const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
// app.use(cookieParser())
// app.use(session({
//     store: MongoStore.create({
//         mongoUrl: "mongodb+srv://Tomas:t4VMECAcMAvPYNN@ecommerceatlas.80zrg.mongodb.net/ecommerceAtlas?retryWrites=true&w=majority",
//         mongoOptions: advancedOptions,
//         collectionName: "sessions"
//     }),
//     secret: "sunrise",
//     saveUninitialized: true,
//     resave: true,
//     cookie: {
//         maxAge: 100000
//     }
// }))