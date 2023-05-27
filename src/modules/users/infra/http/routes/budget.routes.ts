import { Router } from "express";
import bodyParser from "body-parser";

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import BudgetController from "../controllers/BudgetController";

const budgetRouter = Router();
const jsonParser = bodyParser.json();
const budgetController = new BudgetController();

budgetRouter.post('/', ensureAuthenticated, jsonParser, budgetController.create);

export default budgetRouter;