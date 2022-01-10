const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

const pool = require("../database");
const helpers = require("../lib/helpers.js");

passport.use("local.signin", new localStrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
}, async (req, username, password, done) => {
    const rows = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
    if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password, user.password);
        if (validPassword) {
            done(null, user, req.flash("success", "Welcome to Favourite Links! you f*cking " + user.username));
        } else {
            done(null, false, req.flash("message", "Invalid Password you moron!"));
        }
    } else {
        return done(null, false, req.flash("message", "The username isn't exists"));
    }
}));

passport.use("local.signup", new localStrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
}, async (req, username, password, done) => {
    const { fullname } = req.body;
    const newUser = {
            username,
            password,
            fullname
    };
    newUser.password = await helpers.encryptPassword(password);
    const result = await pool.query("INSERT INTO users SET ?", [newUser]);
    newUser.id = result.insertId;
    return done(null, newUser); //null significa sin error, y el newUser se devuelve para que se almacene en la sesion.
}));

//Para almacenar el usuario en una sesion. Gardando el id del usuario
passport.serializeUser((user, done) => {
    done(null, user.id);
});

//Deserializarlo de la session. Tomando el id para obtener los datos.
passport.deserializeUser(async (id, done) => {
    const rows = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    done(null, rows[0]);
});
