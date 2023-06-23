const catchError = require('../utils/catchError');
const Director = require('../models/Director');

const getAll = catchError(async(req, res) => {
    const directors = await Director.findAll();
    return res.json(directors)
});

const create = catchError(async(req, res) => {
    const createDirector = await Director.create(req.body);
    return res.status(201).json(createDirector);
});

const getOneDirector = catchError(async(req, res) =>{
    const { id } = req.params;
    const director = await Director.findByPk(id);
    if(!director) return res.sendStatus(404).json("Director not found");
    return res.json(director)
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const removeDirector = await Director.destroy({where: {id}});
    if(!removeDirector) return res.sendStatus(404).json("Director not found");
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const updateDirector = await Director.update(req.body, {where: {id}, returning: true});
    if(updateDirector[0] === 0) return res.sendStatus(404).json("Director not found");
    return res.json(updateDirector[1][0]);
})

module.exports = {
    getAll,
    create,
    getOneDirector,
    remove,
    update
}