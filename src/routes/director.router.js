const { getAll, create, remove, update, getOneDirector} = require('../controllers/director.controllers');
const express = require('express');

const routerDiretor = express.Router();

routerDiretor.route('/')
    .get(getAll)
    .post(create);

routerDiretor.route('/:id')
    .get(getOneDirector)
    .delete(remove)
    .put(update);

module.exports = routerDiretor