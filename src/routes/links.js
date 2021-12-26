const { Router } = require("express");
const router = Router();

const pool = require("../database.js");

router.get("/add", (req, res) => {
    res.render("links/add");
});

router.post("/add", async (req, res) => {
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description
    }
    await pool.query("INSERT INTO links set ?", [newLink]);
    res.send("Recived");
});

module.exports = router;
