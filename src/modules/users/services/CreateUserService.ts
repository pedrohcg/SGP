import { injectable, inject } from "tsyringe";
import IUsersRepository from '../repositories/IUsersRepository';
import AppError from '../../../shared/errors/AppError';
import bcrpyt from 'bcrypt'

interface IRequest{
    email: string;
    password: string;
}

@injectable()
class CreateUserService{
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ){}

    public async execute({email, password}: IRequest): Promise<number[]>{
        const checkUserExists = await this.usersRepository.findByEmail(email);
        
        if(checkUserExists){
            throw new AppError('Usuário já cadastrado.')
        }

        const hashedPassword = await bcrpyt.hash(password, 8);

        const result = await this.usersRepository.create({email: email, password: hashedPassword});

        return result
    }
}

export default CreateUserService;