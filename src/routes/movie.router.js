const { getAll, create, remove, update, getOneMovie, setGenres, setActors, setDirectors} = require('../controllers/movie.controllers');
const express = require('express');

const routerMovie = express.Router();

routerMovie.route('/')
    .get(getAll)
    .post(create);

routerMovie.route('/:id')
    .get(getOneMovie)
    .delete(remove)
    .put(update);

routerMovie.route('/:id')
    .get(getOneMovie)
    .delete(remove)
    .put(update);
    
routerMovie.route('/:id/genres')
    .post(setGenres)

routerMovie.route('/:id/actors')
    .post(setActors)
    

routerMovie.route('/:id/directors')
    .post(setDirectors)
module.exports = routerMovie;