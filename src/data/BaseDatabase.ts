import knex from "knex";
import Knex   from "knex";


export abstract class BaseDatabase {

    private static connection: Knex | null = null;

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
        CREATE TABLE lama_user(
            id VARCHAR(255) PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            name VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            role ENUM("NORMAL", "ADMIN") NOT NULL
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