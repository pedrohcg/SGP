import {injectable, inject, container} from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import IPavementsRepository from '../repositories/IPavementsRepository';

import CalculateCriticalityService from './CalculateCriticalityService';

interface IRequest{
    nome: string;
    cep: string;
    dtUltimaIntervencao: Date;
    IGG: number;
}

@injectable()
class CreatePavementService{
    constructor(
        @inject('PavementsRepository')
        private pavementsRepository: IPavementsRepository,
    ){}

    public async execute({nome, cep, dtUltimaIntervencao, IGG}: IRequest) {
        const pavement = await this.pavementsRepository.findPavement(nome, cep);

        if(pavement){
            throw new AppError('Pavimento já cadastrado.');
        }

        const calculateCriticality = container.resolve(CalculateCriticalityService);

        const criticality = await calculateCriticality.execute(IGG);

        const result =  await this.pavementsRepository.create({nome, cep, dtUltimaIntervencao, IGG, criticality});

        if(!result){
            throw new AppError('Erro ao armazenar no banco de dados.', 500);
        }
    }
}

export default CreatePavementService;