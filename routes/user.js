const express = require('express');
const { Router } = express;
const router = new Router();
const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config();
const passport = require('passport');
const multer = require('multer');
const upload = multer({ dest: "../src/public/uploads/" });
const bodyParser = require('body-parser');
require('../src/models/config/passport')
const { renderMain, renderSignup, renderLogin, redirectProducts, redirectLogout } = require('../src/models/controllers/userController')

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
router.use(bodyParser.urlencoded({ extended: true }));
// SESIONES *******************************************************************

router.get("/", renderMain);
router.get("/signup", renderSignup)
router.post("/signup", upload.single("avatar"),
    passport.authenticate("local-signup", {
        successRedirect: "/login",
        failureRedirect: "/login",
        passReqToCallback: true
    })
)
router.get("/login", renderLogin)
router.post("/login", 
    passport.authenticate("local-login", { failureRedirect: "/checkPass" }), 
    redirectProducts
)
router.get("/logout", redirectLogout)

module.exports = router;