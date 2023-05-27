import { Router } from "express";
import bodyParser from "body-parser";

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import UsersController from "../controllers/UsersController";

const usersRouter = Router();
const jsonParser = bodyParser.json();
const usersController = new UsersController();

usersRouter.post('/', jsonParser, usersController.create);
usersRouter.get('/profile', ensureAuthenticated, usersController.show);
usersRouter.patch('/update', ensureAuthenticated, jsonParser, usersController.update);

export default usersRouter;