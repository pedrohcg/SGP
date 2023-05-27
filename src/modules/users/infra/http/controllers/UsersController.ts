import { Request, Response } from "express";
import {container} from 'tsyringe';

import CreateUserService from '../../../services/CreateUserService';
import ShowProfileService from "../../../services/ShowProfileService";
import UpdateProfileService from "../../../services/UpdateProfileService";

export default class UsersController{
    public async create(request: Request, response: Response): Promise<Response>{
        const {email, password} = request.body;

        const createUser = container.resolve(CreateUserService);

        await createUser.execute({email, password});

        return response.json('Usuario criado com sucesso.');
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const id = request.user.id;

        const showProfile = container.resolve(ShowProfileService);

        const user = await showProfile.execute(id);

        return response.json(user);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const id = request.user.id;
        const {email, old_password, password} = request.body;

        const updateProfile = container.resolve(UpdateProfileService);

        await updateProfile.execute({id, email, old_password, password});

        return response.json('Dados atualizados.')
    }
}
