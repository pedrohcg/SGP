import { Router } from "express";
import bodyParser from "body-parser";

import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';

import PavementsController from "../controllers/PavementsController";

const pavementsRouter = Router();
const jsonParser = bodyParser.json();
const pavementsController = new PavementsController();

pavementsRouter.post('/', jsonParser, ensureAuthenticated, pavementsController.create);
pavementsRouter.get('/:filter', ensureAuthenticated, pavementsController.show);
pavementsRouter.patch('/:id', jsonParser, ensureAuthenticated, pavementsController.update);

export default pavementsRouter;