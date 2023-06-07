import { Request, Response } from "express";
import {container} from 'tsyringe';

import CreatePavementService from '../../../services/CreatePavementService';
import ShowPavementService from '../../../services/ShowPavementService';
import UpdatePavementService from "../../../services/UpdatePavementService";

export default class PavementsController{
    public async create(request: Request, response: Response): Promise<Response>{
        const {nome, cep, dtUltimaIntervencao, IGG} = request.body;

        const createPavement = container.resolve(CreatePavementService);

        await createPavement.execute({nome, cep, dtUltimaIntervencao, IGG});

        return response.json('Pavimento cadastrado com sucesso.');
    }

    public async show(request: Request, response: Response): Promise<Response>{
        const filter = request.params.filter;

        const getPavement = container.resolve(ShowPavementService);

        const result = await getPavement.execute(filter);

        return response.send(result);
    }

    public async update(request: Request, response: Response): Promise<Response>{
        const id = request.params.id;
        const {nome, dtUltimaIntervencao, IGG} = request.body;

        const updatePavement = container.resolve(UpdatePavementService);

        await updatePavement.execute({id, nome, dtUltimaIntervencao, IGG});

        return response.json('Dados do pavimento atualizados.');
    }
}