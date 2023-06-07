import { Request, Response } from "express";
import {container} from 'tsyringe';

import UpdateBudgetService from "../../../services/UpdateBudgetService";

export default class BudgetController{
    public async create(request: Request, response: Response): Promise<Response> {
        const id = request.user.id;
        const {name, budget} = request.body;

        const updateBudget = container.resolve(UpdateBudgetService);

        await updateBudget.execute({id, name, budget});

        return response.json('Orcamento atualizado.')
         
    }
}