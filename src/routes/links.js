const { Router } = require("express");
const router = Router();

const pool = require("../database.js");

const { isLogIn } = require("../lib/auth.js");

router.get("/add", isLogIn, (req, res) => {
    res.render("links/add");
});

router.post("/add", isLogIn, async (req, res) => {
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description,
        user_id: req.user.id
    }
    await pool.query("INSERT INTO links set ?", [newLink]);
    req.flash("success", "Link added successfully");
    res.redirect("/links");
});

router.get("/", isLogIn, async (req, res) => {
    const links = await pool.query("SELECT * FROM links WHERE user_id = ?", [req.user.id]);
    res.render("links/list", {
        links
    });
});

router.get("/delete/:id", isLogIn, async (req, res) => {
    const { id } = req.params;
    await pool.query("DELETE FROM links WHERE ID = ?", [id]);
    req.flash("success", "Link removed successfully");
    res.redirect("/links");
});

router.get("/edit/:id", isLogIn, async (req, res) => {
    const { id } = req.params;
    const links = await pool.query("SELECT * FROM links WHERE id = ?", [id]);
    res.render("links/edit", {link: links[0]});
});

router.post("/edit/:id", isLogIn, async (req, res) => {
    const { id } = req.params;
    const { title, url, description } = req.body;
    const editLink = {
        title,
        url,
        description
    };
    await pool.query("UPDATE links SET ? WHERE id = ?", [editLink, id]);
    req.flash("success", "Link updated successfully");
    res.redirect("/links");
});

module.exports = router;
