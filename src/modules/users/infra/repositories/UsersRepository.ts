import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import mssqlConfig from '../../../../config/mssqlConfig';
import mssql from 'mssql'

interface IResponse{
    id: number,
    email: string;
    password: string;
}

class UsersRepository implements IUsersRepository{
    constructor(){}

    public async create(newUser: ICreateUserDTO): Promise<number[]>{
        await mssql.connect(mssqlConfig);

        const result = await mssql.query(`INSERT INTO Users (email, password, avatar) VALUES ('${newUser.email}', '${newUser.password}', 'padrao')`)

        return result.rowsAffected;
    }

    public async findByEmail(email: string): Promise<IResponse> {
        await mssql.connect(mssqlConfig);
        
        const result = await mssql.query(`SELECT id, email, password FROM Users where email = '${email}'`)
        console.log(result.recordset[0])
        return result.recordset[0]
    }
}

export default UsersRepository