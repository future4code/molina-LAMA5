import { WeekdaySimpleFn } from "moment";
import { StructuredType } from "typescript";
import { InvalidInputError } from "../error/InvalidInputError";

export class Show{
    constructor(
        private id: string,
        private weekDay: WeekDay,
        private bandId: string,
        private startTime: number,
        private endTime: number
    ){}

    public getId(): string{
        return this.id
    }

    public getWeekDay(): WeekDay{
        return this.weekDay
    }

    public getBandId(): string{
        return this.bandId
    }

    public getStartTime(): number{
        return this.startTime
    }

    public getEndTime(): number{
        return this.endTime
    }

    public setId(id: string){
        this.id = id
    }

    public setWeekDay(weekDay: WeekDay){
        this.weekDay = weekDay
    }

    public setBandId(bandId: string){
        this.bandId = bandId
    }

    public setStartTime(startTime: number){
        this.startTime = startTime
    }

    public setEndTime(endTime: number){
        this.endTime = endTime
    }

    public static toWeekDayEnum(data?: any): WeekDay{
        switch(data){
            case "FRIDAY":
                return WeekDay.FRIDAY
            case "SATURDAY":
                return WeekDay.SATURDAY
            case "SUNDAY":
                return WeekDay.SUNDAY
            default:
                throw new InvalidInputError("Dia da semana inálido")
        }
    }

    public static toShow(data?: any){
        return (data && new Show(
            data.id,
            Show.toWeekDayEnum(data.weekDay || data.week_day),
            data.bandId || data.band_id,
            data.startTime || data.start_time,
            data.endTime || data.end_time
        ))
    }


}

export enum WeekDay {
    FRIDAY = "FRIDAY",
    SATURDAY = "SATURDAY",
    SUNDAY = "SUNDAY"
}

export interface ShowInputDTO{
    bandId: string,
    weekDay: WeekDay,
    startTime: number,
    endTime: number
}

export interface ShowOutPutDTO{
    if: string,
    bandId: string,
    weekDay: WeekDay,
    startTIme: number,
    endTime: number,
    mainGenre?: string,
    bandName?: string
}