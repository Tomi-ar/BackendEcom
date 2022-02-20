const { Router } = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config();
const numCPUs = require('os').cpus().length
const passport = require('passport');
const multer = require('multer');
const upload = multer({ dest: "../public/uploads/" });
const bodyParser = require('body-parser');
require("../src/passport")
require('../src/userDB')
const logger = require('../loggers/logger')
const router = new Router
const carritos = require('../modules/cart')
const productos = require('../modules/products')
const {transporter, mailOrder} = require('../helper/nodeMailer');
const { client, twNewOrder } = require('../helper/Twilio');


// SESIONES *******************************************************************
router.use(session({
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
router.use(passport.initialize());
router.use(passport.session());
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }));
// SESIONES *******************************************************************

// RUTAS ********************************************************
const authorize = (req, res, next) => {
    if (req.isAuthenticated()) {
    next();
    return;
    }
    res.redirect("/login");
};
const authorizeAdmin = (req, res, next) => {
    if (req.user.role == "admin") {
    next();
    return;
    }
    res.send("No tienes permisos");
}

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
        // successRedirect: "/login",
        failureRedirect: "/signup",
        passReqToCallback: true
    }),
    upload.single("avatar"),
    (req, res) => {
        console.log(req.file);
        res.redirect("/login");
    }
)

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

router.get("/logout", (req,res) => {
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
router.get("/carrito", authorize, async (req, res) => {
    try {
        // res.render("productos", {user: req.user.username, check: false})
        await carritos.findOne({ username:req.user.username, estado: "abierto" }, async (err, cart) => {
            if (err) {
                logger.log("error", err.message)
            }
            if (!cart) {
                    const newCart = {
                    username: req.user.username,
                    products: [],
                    estado: "abierto"
                }
                await new carritos(newCart).save()
            }
            res.json(cart)
        })
    } catch (error) {
        logger.log("error", new Error("Error al acceder al carrito"));
    }
})
router.get("/productos", authorize, async (req, res) => {
    try {
        await productos.find({}, (err, products) => {
            if (err) {
                logger.log("error", err.message)
            }
            res.json(products)
        })
    } catch (error) {
        logger.log("error", new Error("Error al obtener los productos"));
    }
})
router.post("/productosAdmin", authorize, authorizeAdmin, async (req, res) => {
    try {
        const newProd = {
        title: req.body.title,
        price: req.body.price,
        items: req.body.items,
        }
        await new productos(newProd).save()
        res.send("Producto guardado")
    } catch (error) {
        logger.log("error", new Error("Error al cargar el producto"));
        res.send(error);
    }
})
router.get("/productos/:id", authorize, async (req, res) => {
    try {
        await productos.findOne({ _id: req.params.id }, async (err, product) => {
            if (err) {
                logger.log("error", err.message)
            }
            await carritos.findOneAndUpdate({ username:req.user.username, estado: "abierto" }, {$push: {products: product}} ,(err, cart) => {
                if (err) { 
                    logger.log("error", err.message)
                }
                res.send(cart)
            })
        })
    } catch (error) {
        logger.log("error", new Error("Error al obtener informacion del producto"));
        res.send(error)
    }
})
router.get("/finalizar", authorize, async (req, res) => {
    try {
        await carritos.findOne({ username:req.user.username, estado: "abierto" }, {$set: {estado: "comprado"}}, async (err, cart) => {
            if (err) {
                logger.log("error", err.message)
            }
            try {
                let info = await transporter.sendMail({
                    ... mailOrder, 
                    html: `<h3>Nuevo pedido de ${cart.username}</h3><p>${cart.products.map(product => `${product.title} - Precio: ${product.price} - Unidades: ${product.items}`).join("<br>")}</p>`
                })
                let message = await client.messages.create({
                    ...twNewOrder,
                    html: `<h3>Nuevo pedido de ${cart.username}</h3><p>${cart.products.map(product => `${product.title} - Precio: ${product.price} - Unidades: ${product.items}`).join("<br>")}</p>`
                })
                res.send("Pedido finalizado")
            } catch (error) {
                logger.log("error", new Error("Error al enviar las comunicaciones"));
            }
        })
    } catch (error) {
        logger.log("error", new Error("Error al finalizar el pedido"));
    }
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
    // console.log(datos);
    res.json({datos})
    logger.log("info", `${req.method}-${req.originalUrl}`);
})
// RUTAS ********************************************************

module.exports = router