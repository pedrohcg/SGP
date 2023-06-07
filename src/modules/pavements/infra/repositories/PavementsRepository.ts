import IPavementsRepository from "../../repositories/IPavementsRepository";
import ICreatePavementDTO from "../../../../modules/pavements/dtos/ICreatePavementDTO";
import mssqlConfig from '../../../../config/mssqlConfig';
import mssql from 'mssql'


class PavementsRepository implements IPavementsRepository{
    constructor(){}

    public async create({ nome, cep, dtUltimaIntervencao, IGG, criticality}: ICreatePavementDTO): Promise<boolean> {
        await mssql.connect(mssqlConfig);

        const result = await mssql.query(`
        INSERT INTO Pavements (nome, cep, dt_Ultima_Intervencao, IGG, id_condicao)
        VALUES ('${nome}', '${cep}', '${dtUltimaIntervencao}', ${IGG}, ${criticality})
        `);

        if(result.rowsAffected){
            return true;
        } else{
            return false;
        }
    }

    public async update(id: string, nome?: string, dtUltimaIntervencao?: Date, IGG?: number, criticality?: number) {
        await mssql.connect(mssqlConfig);

        if(nome){
            await mssql.query(`
            UPDATE Pavements
            SET nome = '${nome}'
            WHERE id = '${id}'`)
        }

        if(dtUltimaIntervencao){
            await mssql.query(`
            UPDATE Pavements
            SET dt_ultima_intervencao = '${dtUltimaIntervencao}'
            WHERE id = '${id}'`)
        }

        if(IGG){
            await mssql.query(`
            UPDATE Pavements
            SET IGG = '${IGG}',
            id_condicao = '${criticality}'
            WHERE id = '${id}'`)
        }
    }

    public async findPavement(name: string, cep: string): Promise<boolean> {
        await mssql.connect(mssqlConfig);

        const result = await mssql.query(`
        SELECT 1 
        FROM Pavements
        WHERE nome = '${name}'
        and CEP = '${cep}'
        `)

        if(result.recordset[0]){
            return true;
        } else{
            return false;
        }
    }

    public async findByFilter(filter: string): Promise<JSON> {
        await mssql.connect(mssqlConfig);

        const result = await mssql.query(`
        SELECT nome, cep, dt_ultima_intervencao, imagens_pavimentos, IGG, condicao
        FROM Pavements P
        INNER JOIN Condicao_Pavimentos CP
        ON P.id_condicao = CP.id
        WHERE P.nome LIKE '%${filter}%'
        OR P.cep LIKE '${filter}' 
        `)

        return result.recordset[0];
    }

    public async findById(id: string): Promise<JSON> {
        await mssql.connect(mssqlConfig);

        const result = await mssql.query(`
        SELECT *
        FROM Pavements
        WHERE id = '${id}'
        `)

        return result.recordset[0]
    }
}

export default PavementsRepository