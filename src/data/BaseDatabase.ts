import knex from "knex";
import Knex   from "knex";


export abstract class BaseDatabase {

    private static connection: Knex | null = null;

    protected tableNames = {
        bands: "lama_band",
        shows: "lama_shows",
        users: "lama_user"
    }

    protected getConnection(): Knex{
        if(!BaseDatabase.connection){
            BaseDatabase.connection = knex({
                client: "mysql",
                connection: {
                  host: process.env.DB_HOST,
                  port: 3306,
                  user: process.env.DB_USER,
                  password: process.env.DB_PASSWORD,
                  database: process.env.DB_DATABASE_NAME,
                  multipleStatements: true,
                },
              });        
        }

        return BaseDatabase.connection;
    }

    public createTables(){
        BaseDatabase.connection?.raw(`
        CREATE TABLE IF NOT EXISTS lama_user(
            id VARCHAR(255) PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            name VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            role ENUM("NORMAL", "ADMIN") NOT NULL DEFAULT "NORMAL"
        );

        CREATE TABLE lama_band(
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            musical_genre VARCHAR(255) NOT NULL,
            resposible VARCHAR(255) UNIQUE NOT NULL
        );
        
        CREATE TABLE lama_shows(
            id VARCHAR(255) PRIMARY KEY,
            week_day VARCHAR(255) NOT NULL,
            start_time INT NOT NULL,
            end_time INT NOT NULL,
            band_id VARCHAR(255) NOT NULL,
            FOREIGN KEY (band_id) REFERENCES lama_band(id)
        );
        
        `)
    }

    public static async destroyConnection(): Promise<void>{
        if(BaseDatabase.connection){
            await BaseDatabase.connection.destroy();
            BaseDatabase.connection = null;
        }
    }

}