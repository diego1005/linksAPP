const { Router } = require("express");
const router = Router();

const passport = require("passport");
const { isLogIn, isNotLogIn } = require("../lib/auth.js");

router.get("/signup", isNotLogIn, (req, res) => {
    res.render("auth/signup.hbs");
});

/*
router.post("/signup", (req, res) => {
    passport.authenticate("local.signup", {
        successRedirect: "/profile",
        failureRedirect: "/signup",
        failureFlash: true
    });
    res.send("recived");
});
*/

router.post("/signup", isNotLogIn, passport.authenticate("local.signup", {
    successRedirect: "/profile",
    failureRedirect: "/signup",
    failureFlash: true
}));

router.get("/signin", isNotLogIn, (req, res) => {
    res.render("auth/signin.hbs");
});

router.post("/signin", isNotLogIn,  (req, res, next) => {
    passport.authenticate("local.signin", {
        successRedirect: "/profile",
        failureRedirect: "/signin",
        failureFlash: true
    })(req, res, next)
});

router.get("/profile", isLogIn, (req, res) => {
    res.render("profile.hbs");
});

router.get("/logout", isLogIn, (req, res) => {
    req.logOut();
    res.redirect("/signin");
});

module.exports = router;
