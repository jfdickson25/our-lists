const express = require('express');
const router = express();

const homeRoutes = require('./home');
const createListRoutes = require('./createList');
const joinListRoutes = require('./joinList');
const myListsRoutes = require('./myLists');
const listRoutes = require('./list');

router
    .use('/', homeRoutes)
    .use('/createList', createListRoutes)
    .use('/joinList', joinListRoutes)
    .use('/myLists', myListsRoutes)
    .use('/list', listRoutes);

module.exports = router;