import { BandDataBase } from "../data/BandDataBase";
import { InvalidInputError } from "../error/InvalidInputError";
import { UnauthorizedError } from "../error/UnauthorizedError";
import { Band, BandInputDTO } from "../model/Band";
import { UserInputDTO, UserRole } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class BandBusiness {
    constructor(
        private bandDataBase: BandDataBase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ){}

    async registerBand(input: BandInputDTO, token: string){
        const tokenData = this.authenticator.getData(token)

        if(tokenData.role !== UserRole.ADMIN){
            throw new UnauthorizedError("Acesso autorizado apenas para administrador")
        }

        if(!input.name || !input.mainGenre || !input.responsible){
            throw new InvalidInputError("Todos os campos devem ser preenchidos")
        }

        await this.bandDataBase.createBand(
            Band.toBand({
                ...input,
                id: this.idGenerator.generate()
            })!
        )
    }

    async getBandDetailsByIdOrName(input: string): Promise<Band>{
        if(!input){
            throw new InvalidInputError("Input inválido")
        }

        return this.bandDataBase.getBandIdOrNameOrFail(input)
    }
}