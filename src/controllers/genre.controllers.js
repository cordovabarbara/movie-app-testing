const catchError = require('../utils/catchError');
const Genre = require('../models/Genre');

const getAll = catchError(async(req, res) => {
    const genres = await Genre.findAll();
    return res.json(genres)
});

const create = catchError(async(req, res) => {
    const createGenres = await Genre.create(req.body);
    return res.status(201).json(createGenres);
});

const getOneGenre = catchError(async(req, res) =>{
    const { id } = req.params;
    const genre = await Genre.findByPk(id);
    if(!genre) return res.sendStatus(404).json("Genre not found");
    return res.json(genre)
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const removeGenre = await Genre.destroy({where: {id}});
    if(!removeGenre) return res.sendStatus(404).json("Genre not found");
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const updateGenre = await Genre.update(req.body, {where: {id}, returning: true});
    if(updateGenre[0] === 0) return res.sendStatus(404).json("Genre not found");
    return res.json(updateGenre[1][0]);
})

module.exports = {
    getAll,
    create,
    getOneGenre,
    remove,
    update
}