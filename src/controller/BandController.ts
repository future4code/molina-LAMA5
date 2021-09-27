import { Request, Response } from "express";
import { BandBusiness } from "../business/BandBusiness";
import { BandDataBase } from "../data/BandDataBase";
import { BaseDatabase } from "../data/BaseDatabase";
import { BandInputDTO } from "../model/Band";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class BandController {
    async registerBand( req: Request, res: Response){
        try{
            const input: BandInputDTO = {
                name: req.body.name,
                mainGenre: req.body.mainGenre,
                responsible: req.body.responsible
            }
    
            const bandBusiness = new BandBusiness(
                new BandDataBase,
                new IdGenerator,
                new Authenticator
            )
    
            await bandBusiness.registerBand(input, req.headers.authorization as string)

            res.sendStatus(200)
        }catch(error: any){
            res.status(error.customErrorCode || 400).send(error.message)
        }finally{
            await BaseDatabase.destroyConnection()
        }
    
    }
}