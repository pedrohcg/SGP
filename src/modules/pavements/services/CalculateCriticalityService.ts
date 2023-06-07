import {injectable} from 'tsyringe';

@injectable()
class CalculateCriticalityService{
    constructor(){}

    public async execute(IGG: number): Promise<number>{
        if(IGG <= 20){
            return 1;
        } else if (IGG <=40){
            return 2;
        } else if (IGG <= 80){
            return 3;
        } else if (IGG <= 160){
            return 4;
        } else{
            return 5;
        }
    }
}

export default CalculateCriticalityService;