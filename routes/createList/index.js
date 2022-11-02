const express = require('express');
const router = express();

const listModel = require('../../models/list');

router
    .get('/', (req, res, next) => {
        res.status(200).render("create");
    })
    .post('/', async (req, res, next) => {
        // Get list name
        let listName = req.body.list;
        let randomCode = req.body.code;

        new listModel({
            name: listName,
            code: randomCode,
            categories: []
        }).save();

        // Don't render, redirect
        res.status(200).redirect(`/list/${randomCode}`);
    });

module.exports = router;