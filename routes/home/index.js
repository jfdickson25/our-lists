const express = require('express');
const router = express();

router
    .get('/', (req, res, next) => {
        res.status(200).render("home");
    });

module.exports = router;