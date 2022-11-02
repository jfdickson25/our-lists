const express = require('express');
const router = express();

const listModel = require('../../models/list');

router
    .get('/', (req, res, next) => {
        res.status(200).render("myLists");
    })
    .get('/:code', (req, res, next) => {
        listModel.findOne({code: req.params.code})
        .then(response => {
            res.status(200).send(response.name);
        })
        .catch(err => {
            res.status(500).send(false);
        })
    });

module.exports = router;