import ICreateUserDTO from "../dtos/ICreateUserDTO";
import ICreateBudgetDTO from '../dtos/ICreateBudgetDTO'

export interface FindByEmailResponse{
    id: number;
    email: string;
    password: string;
}

export interface FindByIdResponse {
    email: string;
    password: string;
    avatar: string;
    orcamento: number;
}

export default interface IUsersRepository{
    create(data: ICreateUserDTO): Promise<number[]>;
    findByEmail(email?: String): Promise<FindByEmailResponse>;
    findById(id: string): Promise<FindByIdResponse>;
    updateUser(id: string, email?: string, password?: string);
    createBudget(id: string, data: ICreateBudgetDTO);
    updateBudget(id: string, budget: number);
}