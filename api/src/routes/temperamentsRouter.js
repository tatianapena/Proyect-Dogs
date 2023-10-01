const { Router } = require('express');
const temperamentsGetHandler  = require('../handlers/temperamentsHandler');

const temperamentsRouter = Router();

temperamentsRouter.get('/', temperamentsGetHandler);

module.exports = temperamentsRouter;