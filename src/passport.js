const passport = require("passport");
const localStrategy = require("passport-local").Strategy
const User = require("../modules/user");


function validPassword(user, pass) {
    return bcrypt.compareSync(pass, user[0].password);
}

const authorize = (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
      return;
    }
    res.redirect("/login");
  };


passport.use("local-login",new localStrategy((username, password, done) => {
    User.findOne({ 
        where: {
            username: username,
        }}, (err, user) => {
            if(err) {
                return done(err);
            }
            if(!user) {
                console.log("Usuario no encontrado");
                return done(null, false)
            }
            if(!user.validPassword(user, password)) {
                console.log("Contraseña incorrecta");
                return done(null, false)
            }
            return done(null, user);
        })
    }) 
)

passport.serializeUser((user, done) => {
    done(null, user._id);
});
  
passport.deserializeUser((id, done) => {
    User.findById(id, done);
});