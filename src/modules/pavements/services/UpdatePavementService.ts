import {injectable, inject, container} from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import IPavementsRepository from '../repositories/IPavementsRepository';

import CalculateCriticalityService from './CalculateCriticalityService';

interface IRequest{
    id: string;
    nome: string;
    dtUltimaIntervencao: Date;
    IGG: number;
}

@injectable()
class UpdatePavementService{
    constructor(
        @inject('PavementsRepository')
        private pavementsRepository: IPavementsRepository,
    ){}

    public async execute({id, nome, dtUltimaIntervencao, IGG}: IRequest){
        const pavementExists = await this.pavementsRepository.findById(id);
        let criticality;

        if(!pavementExists){
            throw new AppError('Pavimento inexistente.');
        }

        if(IGG){
            const calculateCriticality = container.resolve(CalculateCriticalityService);

            criticality = await calculateCriticality.execute(IGG);
        }

        await this.pavementsRepository.update(id, nome, dtUltimaIntervencao, IGG, criticality)
    }
}

export default UpdatePavementService;