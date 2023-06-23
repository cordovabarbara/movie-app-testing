const { getAll, create, remove, update, getOneGenre} = require('../controllers/genre.controllers.js');
const express = require('express');

const routerGenre = express.Router();

routerGenre.route('/')
    .get(getAll)
    .post(create);

routerGenre.route('/:id')
    .get(getOneGenre)
    .delete(remove)
    .put(update);

module.exports = routerGenre;