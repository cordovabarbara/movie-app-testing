const catchError = require('../utils/catchError');
const Actor = require('../models/Actor');

const getAll = catchError(async(req, res) => {
    const actors = await Actor.findAll();
    return res.json(actors)
});

const create = catchError(async(req, res) => {
    const createActor = await Actor.create(req.body);
    return res.status(201).json(createActor);
});

const getOneActor = catchError(async(req, res) =>{
    const { id } = req.params;
    const actor = await Actor.findByPk(id);
    if(!actor) return res.sendStatus(404).json("Actor not found");
    return res.json(actor)
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const removeActor = await Actor.destroy({where: {id}});
    if(!removeActor) return res.sendStatus(404).json("Actor not found");
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const updateActor = await Actor.update(req.body, { where: {id}, returning: true });
    if(updateActor[0] === 0) return res.sendStatus(404).json("Actor not found");
    return res.json(updateActor[1][0]);
})

module.exports = {
    getAll,
    create,
    getOneActor,
    remove,
    update
}