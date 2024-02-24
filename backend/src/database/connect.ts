import { DataSource } from "typeorm";

//db connection
export const connectionOptions = {
    database: process.env.DB_CONNECTION_NAME,
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    applicationName: process.env.CLIENT_NAME,
    synchronize: JSON.parse(process.env.DB_SYNCHRONIZE),
    logging: JSON.parse(process.env.DB_LOGGING),
    // ssl: true,
    entities: JSON.parse(process.env.DB_ENTITIES),
    migrations: JSON.parse(process.env.DB_MIGRATIONS),
    subscribers: JSON.parse(process.env.DB_SUBSCRIBERS),
    cli: {
      entitiesDir: process.env.DB_ENTITIES_DIR,
      migrationsDir: process.env.DB_MIGRATIONS_DIR,
      subscribersDir: process.env.DB_SUBSCRIBERS_DIR,
    },
  };

export let connection:DataSource;
export default async function connect(){
    try{
          const dataSourceOptions: any = connectionOptions;
          connection = new DataSource(dataSourceOptions);
          connection = await connection.initialize();
          console.log('Database Connected Successfully!!');
          // console.log(connection);
          return connection;
    }
    catch(error){
        console.log('Something Went Wrong!!');
        console.log(error);
    }
}