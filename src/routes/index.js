const express = require('express');
const routerMovie = require('./movie.router');
const routerGenre = require('./genre.router');
const routerActor = require('./actor.router');
const routerDiretor = require('./director.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/movies', routerMovie)
router.use('/genres', routerGenre)
router.use('/actors', routerActor)
router.use('/directors', routerDiretor)
router.use('/:id/genres', routerMovie)
router.use('/:id/actors', routerMovie)
router.use('/:id/directors', routerMovie)


module.exports = router;