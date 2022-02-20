const passport = require("passport");
const localStrategy = require("passport-local").Strategy
const usuarios = require("../modules/user");
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();
const {transporter, mailSignup} = require('../helper/nodeMailer');
const { client, twNewUser } = require('../helper/Twilio');

// ENCRIPTAR CONTRASEÑA ********************************************************
const saltRounds = 10;
// ENCRIPTAR CONTRASEÑA ********************************************************

passport.use("local-signup", new localStrategy({passReqToCallback: true}, async (req, username, password, done) => {
    try {
        await usuarios.findOne({ username: username }, async (err,user) => {
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
                tel: req.body.tel,
                avatar: req.file
            }
            new usuarios(newUser).save()
            console.log("registrado");

            try {
                // EMAIL
                let info = await transporter.sendMail(mailSignup)
                console.log(info)
                // TWILIO
                let message = await client.messages.create(twNewUser)
                console.log(message)
            } catch(err) {
                console.log(err)
            }
            return done(null, user)
            })
        } catch (error) {
            console.log("Error registrando" + error)
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
    usuarios.findById(id, done);
});

module.exports 