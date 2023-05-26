import { Request, Router } from "express";
import bodyParser from "body-parser";

import UsersController from "../controllers/UsersController";

const usersRouter = Router();
const jsonParser = bodyParser.json();
const usersController = new UsersController();

usersRouter.post('/', jsonParser, usersController.create);

export default usersRouter;