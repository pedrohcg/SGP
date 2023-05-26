import { Request, Response } from "express";
import {container} from 'tsyringe';

import CreateUserService from '../../../services/CreateUserService';

export default class UsersController{
    public async create(request: Request, response: Response): Promise<Response>{
        const {email, password} = request.body;

        const createUser = container.resolve(CreateUserService);

        await createUser.execute({email, password});

        return response.json('Usuario criado com sucesso.');
    }
}
