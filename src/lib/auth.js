module.exports = {
    isLogIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect("/signin");
    },

    isNotLogIn(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        return res.redirect("/profile");
    }
};
