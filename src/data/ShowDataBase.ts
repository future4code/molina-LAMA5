import { NotFoundError } from "../error/NotFoundError";
import { Show, ShowOutPutDTO, WeekDay } from "../model/Show";
import { BaseDatabase } from "./BaseDatabase";

export class ShowDataBase extends BaseDatabase{
    
    private static TABLE_NAME = "lama_shows"

    public async createShow(show: Show): Promise<void>{
        await this.getConnection()
        .insert({
            id: show.getId(),
            band_id: show.getBandId(),
            start_time: show.getStartTime(),
            end_time: show.getEndTime(),
            week_day: show.getWeekDay()
        })
        .into(ShowDataBase.TABLE_NAME)
    }

    public async getShowsByTime(
        weekDay: WeekDay,
        startTime: number,
        endTime: number
    ): Promise<ShowOutPutDTO>{
        const shows = await this.getConnection().raw(`
            SELECT id, start_time as startTime,
                end_time as endTime,
                week_day as weekDay
            FROM ${ShowDataBase.TABLE_NAME} 
            WHERE week_day = "${weekDay}"
            AND start_time <= "${endTime}"
            AND end_time >= "${startTime}"
            ORDER BY start_time ASC
        `)

        return shows.map((show: any) => {
            return {
                id: show.id,
                bandId: show.bandId,
                startTime: show.startTIme,
                endTime: show.endTime,
                weekDay: show.weekDay
            }
        })
    }

    public async getShowsByWeekDayOrFail(weekDay: WeekDay): Promise<ShowOutPutDTO>{
        const shows = await this.getConnection().raw(`
            SELECT s.id as id,
                b.id as bandId,
                s.start_time as startTime,
                s.end_time as endTime,
                s.week_day as weekDay,
                b.musical_genre as musicGenre
            FROM ${this.tableNames.shows} s
            LEFT JOIN ${this.tableNames.bands} b
            ON b.id = s.band_id
            WHERE s.week_day = "${weekDay}"
            ORDER BY start_time ASC
        `)

        if(!shows.length){
            throw new NotFoundError(`não foi encontrado show para ${weekDay}`)
        }

        return shows[0].map((data: any) => ({
            id: data.id,
            bandId: data.bandId,
            startTime: data.startTime,
            endTime: data.endTime,
            weekDay: data.weekDay,
            mainGenre: data.mainGenre
        }))
    }
}