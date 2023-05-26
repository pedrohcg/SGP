import ICreateUserDTO from "../dtos/ICreateUserDTO";

interface IResponse{
    id: number;
    email: string;
    password: string;
}

export default interface IUsersRepository{
    create(data: ICreateUserDTO): Promise<number[]>;
    findByEmail(email: String): Promise<IResponse>;
}