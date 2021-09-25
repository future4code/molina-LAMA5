export class Band {
    constructor(
        private id: string,
        private name: string,
        private mainGenre: string,
        private responsible: string
    ){}

    public getId(): string{
        return this.id
    }

    public getName(): string{
        return this.name
    }

    public getMainGenre(): string{
        return this.mainGenre
    }

    public getResponsible(): string{
        return this.responsible
    }

    public setName(name: string){
        this.name = name
    }

    public setMainGenre(mainGenre: string){
        this.mainGenre = mainGenre
    }

    public setResponsible(responsible: string){
        this.responsible =  responsible
    }

    public static toBand(data?: any): Band | undefined{
        return( data && new Band (
            data.id,
            data.name,
            data.mainGenre || data.main_genre || data.musicalGenre || data.musical_genre,
            data.resposible
        ))
    }
}

export interface BandInputDTO {
    name: string,
    mainGenre: string,
    responsible: string
}