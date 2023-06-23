const { getAll, create, remove, update, getOneActor, } = require('../controllers/actor.controllers');
const express = require('express');

const routerActor  = express.Router();

routerActor.route('/')
    .get(getAll)
    .post(create);

routerActor.route('/:id')
    .get(getOneActor)
    .delete(remove)
    .put(update);

module.exports = routerActor