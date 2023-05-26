import {injectable, inject} from 'tsyringe';
import {sign} from 'jsonwebtoken';

import authConfig from '../../../config/authConfig';
import {compare} from 'bcrypt';
import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest{
    email: string;
    password: string;
}

@injectable()
class AuthenticateUserService{
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ){}

    public async execute({email, password}: IRequest): Promise<string>{
        const user =  await this.usersRepository.findByEmail(email);

        if(!user){
            throw new AppError('Senha/E-mail incorretos.')
        }
     
        const passwordMatched = await compare(password, user.password);

        if(!passwordMatched){
            throw new AppError('Senha/E-mail incorretos.')
        }

        const {secret, expiresIn} = authConfig.jwt;

        const token = sign({}, secret, {subject: user.id.toString(), expiresIn});

        return token;
    }
}

export default AuthenticateUserService;
