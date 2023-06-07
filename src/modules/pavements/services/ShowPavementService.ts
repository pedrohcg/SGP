import {injectable, inject, container} from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import IPavementsRepository from '../repositories/IPavementsRepository';

@injectable()
class ShowPavementService{
    constructor(
        @inject('PavementsRepository')
        private pavementsRepository: IPavementsRepository,
    ){}

    public async execute(id: string): Promise<JSON>{
        const pavement = await this.pavementsRepository.findByFilter(id);

        return pavement;
    }
}

export default ShowPavementService;