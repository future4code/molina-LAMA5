import { Band } from "../model/Band";
import { BaseDatabase } from "./BaseDatabase";

export class BandDataBase extends BaseDatabase{
    private static TABLE_NAME = "lama_band"

    public async createBand(band: Band): Promise<void> {
        try{

            console.log(band)
            await this.getConnection()
            .insert({
                id: band.getId(),
                name: band.getName(),
                musical_genre: band.getMainGenre(),
                resposible: band.getResponsible()
            })
            .into(BandDataBase.TABLE_NAME)

        }catch(error: any){
            throw new Error(error.sqlMessage || error.message)
        }
    }
}