import { injectable, inject } from "tsyringe";
import IUsersRepository from '../repositories/IUsersRepository';
import {hash, compare} from 'bcrypt';

import AppError from '../../../shared/errors/AppError';

interface IRequest{
    id: string;
    email?: string;
    old_password?: string;
    password?: string;
}

@injectable()
class UpdateProfileService{
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ){}

    public async execute({id, email, old_password, password}: IRequest): Promise<any>{
        const user = await this.usersRepository.findById(id);
        let hashedPassword;

        if(!user){
            throw new AppError('Usuário não encontrado.');
        }

        const emailAlreadyUsed = await this.usersRepository.findByEmail(email);

        if(emailAlreadyUsed && emailAlreadyUsed.id !== Number(id)){
            throw new AppError('Email em uso.');
        }
    
        if(password && old_password){
    
            const checkOldPassword = await compare(old_password, user.password);

            if(!checkOldPassword){
                throw new AppError('Senha incorreta.');
            }

            hashedPassword = await hash(password, 8);
        }
        
        const result = await this.usersRepository.updateUser(id, email, hashedPassword);

        return result;
    }
}

export default UpdateProfileService;