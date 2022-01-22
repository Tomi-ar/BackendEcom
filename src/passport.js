const passport = require("passport");
const localStrategy = require("passport-local").Strategy
const User = require("../modules/user");
const bcrypt = require('bcrypt');

// ENCRIPTAR CONTRASEÑA ********************************************************
const saltRounds = 10;
// ENCRIPTAR CONTRASEÑA ********************************************************

passport.use("local-signup", new localStrategy(
    // {passReqToCallback: true}, 
    ( username, password, done) => {
        User.findOne({ username: username}, (err,user) => {
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
                password: bcrypt.hashSync(password, saltRounds)
            }
            new User(newUser).save()
            console.log("registrado?");
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