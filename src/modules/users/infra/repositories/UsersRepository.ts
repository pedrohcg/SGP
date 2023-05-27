import IUsersRepository, { FindByEmailResponse, FindByIdResponse } from "../../../users/repositories/IUsersRepository";
import ICreateUserDTO from "../../../../modules/users/dtos/ICreateUserDTO";
import ICreateBudgetDTO from "../../dtos/ICreateBudgetDTO";
import mssqlConfig from '../../../../config/mssqlConfig';
import mssql from 'mssql'


class UsersRepository implements IUsersRepository{
    constructor(){}

    public async create(newUser: ICreateUserDTO): Promise<number[]>{
        await mssql.connect(mssqlConfig);

        const result = await mssql.query(`INSERT INTO Users (email, password, avatar) VALUES ('${newUser.email}', '${newUser.password}', 'padrao')`)

        return result.rowsAffected;
    }

    public async findByEmail(email?: string): Promise<FindByEmailResponse> {
        await mssql.connect(mssqlConfig);
        
        const result = await mssql.query(`SELECT id, email, password FROM Users where email = '${email}'`)
  
        return result.recordset[0];
    }

    public async findById(id: string): Promise<FindByIdResponse> {
        await mssql.connect(mssqlConfig);

        const result = await mssql.query(`
        SELECT email, avatar, password, o.valor as orcamento
        FROM Users U
        LEFT JOIN Orcamentos O 
        ON U.id_orcamento = O.id
        WHERE U.id = '${id}'
        `)

        return result.recordset[0];
    }

    public async updateUser(id: string, email?: string, password?: string){
        await mssql.connect(mssqlConfig);

        if(email){
            await mssql.query(`
            UPDATE Users
            SET email = '${email}'
            WHERE id = '${id}'
            `)
        }

        if(password){
            await mssql.query(`
            UPDATE Users
            SET password = '${password}'
            WHERE id = '${id}'
            `)
        }
    }

    public async createBudget(id: string, data: ICreateBudgetDTO) {
        await mssql.connect(mssqlConfig);

        const result = await mssql.query(`
        INSERT INTO Orcamentos (Responsavel, valor) 
        VALUES ('${data.owner}', '${data.budget}')
        
        UPDATE Users
        SET id_orcamento = (SELECT id FROM Orcamentos WHERE Responsavel = '${data.owner}')
        WHERE id = '${id}'`);

        return result;
    }

    public async updateBudget(id: string, budget: number) {
        await mssql.connect(mssqlConfig);

        const result = await mssql.query(`
        UPDATE Orcamentos
        SET valor = ${budget}
        FROM Orcamentos O
        INNER JOIN Users U
        ON O.id = U.id_orcamento
        WHERE U.id = '${id}'
        `);

        return result;
    }
}

export default UsersRepository