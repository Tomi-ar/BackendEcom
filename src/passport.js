const passport = require("passport");
const localStrategy = require("passport-local").Strategy
const User = require("../modules/user");
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

// ENCRIPTAR CONTRASEÑA ********************************************************
const saltRounds = 10;
// ENCRIPTAR CONTRASEÑA ********************************************************

// ******************** CONFIG DE NODE MAILER ************************************
const transporter = createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: process.env.EMAIL_SIGNUP,
        pass: process.env.EMAIL_PASS
    }
})

const mailOptions = {
    from: "Servidor node.js",
    to: process.env.EMAIL_SIGNUP,
    subject: "Nuevo usuario registrado",
    html: "<h3>Contenido de prueba desde <span>Nodemailer</span></h3>"
}
// ******************** CONFIG DE NODE MAILER ************************************

passport.use("local-signup", new localStrategy(
    {passReqToCallback: true}, 
    (req, username, password, done) => {
        User.findOne({ username: username}, async (err,user) => {
            if(err) {
                console.log("parece que tenemos un problema");
                return done(err);
            }
            if(user) {
                console.log("usuario registrado");
                return done(null, false);
            }
            const newUser = {
                username: username,
                password: bcrypt.hashSync(password, saltRounds),
                names: req.body.names,
                age: req.body.age,
                address: req.body.address,
                tel: req.body.tel
            }
            new User(newUser).save()
            console.log("registrado");
            try {
                let info = await transporter.sendMail(mailOptions)
                console.log(info)
                res.send("Email enviado correctamente")
            } catch(err) {
                console.log(err)
            }
            return done(null, user)
                     
        })
    }
))

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

function isValidPassword(user, pass) {
    return bcrypt.compareSync(pass, user.password);
}

passport.serializeUser((user, done) => {
    done(null, user.id);
});
  
passport.deserializeUser((id, done) => {
    User.findById(id, done);
});

module.exports 