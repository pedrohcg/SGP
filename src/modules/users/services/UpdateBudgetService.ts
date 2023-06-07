import {injectable, inject} from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest{
    id: string;
    name?: string;
    budget: number;
}

@injectable()
class UpdateBudgetService{
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ){}

    public async execute({id, name, budget}: IRequest) {
        const user = await this.usersRepository.findById(id);

        if(user.orcamento === null){
            if(!name){
                throw new AppError('Necessario dar nome ao orcamento.')
            }

            const result = await this.usersRepository.createBudget(id, {owner: name, budget})
        } else {
            const result = await this.usersRepository.updateBudget(id, budget);
        }   
    }
}

export default UpdateBudgetService;