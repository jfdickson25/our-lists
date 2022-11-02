const express = require('express');
const router = express();

const listModel = require('../../models/list');

router
    .get('/', (req, res, next) => {
        res.status(200).render("join");
    })
    .get('/:code', (req, res, next) => {
        listModel.findOne({code: req.params.code})
        .then(response => {
            if(response === null) {
                res.status(500).send(false);
            } else {
                res.status(200).send(true);
            }
        })
        .catch(err => {
            console.log(err);
        });
    });

module.exports = router;