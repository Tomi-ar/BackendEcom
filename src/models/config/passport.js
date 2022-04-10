const passport = require('passport');
const localStrategy = require("passport-local").Strategy
const usuarios = require("../containers/users/userSchema");
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();
const {transporter, mailSignup} = require('./nodeMailer');
const logger = require('../../../loggers/logger')

const saltRounds = 10

passport.use("local-signup", new localStrategy({passReqToCallback: true}, async (req, username, password, done) => {
    try {
        await usuarios.findOne({ username: username }, async (err,user) => {
            if(err) {
                logger.log("error", new Error("Parece que tenemos un problema al registrarse"));
                return done(err);
            }
            if(user) {
                logger.log("warn", new Error("Usuario ya registrado"));
                return done(null, false);
            }
            const newUser = {
                username: username,
                password: bcrypt.hashSync(password, saltRounds),
                names: req.body.names,
                age: req.body.age,
                address: req.body.address,
                tel: req.body.tel,
                role: req.body.role || "user",
                avatar: req.file
            }
            await new usuarios(newUser).save()
            logger.log("info", `Usuario ${username} registrado`);

            try {
                // EMAIL
                let info = await transporter.sendMail(mailSignup)
                logger.log("info", `Email de signup enviado a ${username}`);
                // TWILIO
                // let message = await client.messages.create(twNewUser)
                // console.log(message)
            } catch(err) {
                logger.log("error", new Error("Error al enviar email de signup"));
            }
            return done(null, user)
            })
        } catch (error) {
            logger.log("error", new Error("Error resgistrando usuario"));
        }
    }
))

function isValidPassword(user, pass) {
    return bcrypt.compareSync(pass, user.password);
}

passport.use("local-login",new localStrategy((username, password, done) => {
    usuarios.findOne({ username: username }, (err, user) => {
            if(err) {
                return done(err);
            }
            if(!user) {
                logger.log("warn", new Error("Usuario no encontrado"));
                return done(null, false)
            }
            if(!isValidPassword(user, password)) {
                logger.log("warn", new Error("Contraseña incorrecta"));
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
    usuarios.findById(id, done);
});

module.exports 