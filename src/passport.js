const passport = require("passport");
const localStrategy = require("passport-local").Strategy
const { userSchema, userDB } = require("../modules/user");


passport.use("local-login",new localStrategy(async (username, password, done) => {
    let user = await userDB.findOne({ 
        where: {
            username: username,
            password: password
        }
     })
     if(user) {
         return done(null, user)
     }
     done(null, false)
    }) 
)