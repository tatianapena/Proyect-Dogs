const { Router } = require('express');
const { getDogsHandler, getDetailDogHandler, createDogHandler} = require('../handlers/dogsHandler');

const dogsRouter = Router();


dogsRouter.get('/', getDogsHandler);

dogsRouter.get('/:id', getDetailDogHandler);

dogsRouter.post('/', createDogHandler);

module.exports = dogsRouter;