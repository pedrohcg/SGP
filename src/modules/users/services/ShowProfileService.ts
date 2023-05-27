import { injectable, inject } from "tsyringe";
import IUsersRepository from '../repositories/IUsersRepository';

interface IResponse{
    avatar: string;
    email: string;
    orcamento: number;
}

@injectable()
class ShowProfileService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ){}

    public async execute(id: string): Promise<IResponse>{
        const {avatar, email, password, orcamento}= await this.usersRepository.findById(id);

        return {avatar, email, orcamento};
    }
}

export default ShowProfileService;