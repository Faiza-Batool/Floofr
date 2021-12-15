const express = require('express');
const knex = require('../db/client');
const router = express.Router();

// floof/new
router.get("/new", (req, res) => {
    res.render("floofs/new");
});

//create
router.post("/", (req, res) => {
    let username = req.cookies.username || 'anonymous';
    if (username == req.cookies.username) {

        console.log(`Inserting ${req}`);
        knex("floofs")
            .insert(
                {
                    username: username,
                    story: req.body.story,
                    imageUrl: req.body.imageUrl
                },
                "*"
            )
            .then(data => {
                console.log(data);
                res.redirect(`/floofs`)
            });

    } else {
        res.redirect('/sign_in')
    }

});

// index

router.get("/", (req, res) => {
    knex
        .select('*')
        .from('floofs')
        .orderBy('createdAt', 'desc')
        .then(data => {
            console.log(data);
            res.render("floofs/index", { list: data });
        })
});

module.exports = router;