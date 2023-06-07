import ICreatePavementDTO from "../dtos/ICreatePavementDTO";

export default interface IPavementsRepository{
    create({nome, cep, dtUltimaIntervencao, IGG, criticality}: ICreatePavementDTO): Promise<boolean>;
    update(id: string, nome?: string, dtUltimaIntervencao?: Date, IGG?: number, criticality?: number);
    findPavement(name: string, cep: string): Promise<boolean>;
    findByFilter(filter: string): Promise<JSON>;
    findById(id: string): Promise<JSON>;
}