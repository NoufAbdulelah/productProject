import { join } from 'path';
import Product from '../entity/product.entity';
import User from '../entity/user.entity'

export function getOrmConfig() {
    let OrmConfig;
    const settings = {
        type: 'postgres',
        username: process.env.DB_USER,
        password: '123123',
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        port: Number(process.env.DB_PORT),
    };

    if (process.env.NODE_ENV !== 'test') {
        OrmConfig = {
            type: 'postgres',
            host: settings.host,
            port: settings.port,
            username: settings.username,
            password: settings.password,
            database: settings.database,
            entities:  [ User, Product],
            synchronize: false,
            migrationsRun: true,
            logging: true,
            migrations: [__dirname + '/migrations/**/*.{ts,js}'],
            cli:{
                migrationsDir: 'src/migrations',
                entitiesDir: 'src/entity'
            }
        };
    } else {
        OrmConfig = {
            type: 'postgres',
            host: settings.host,
            port: settings.port,
            username: settings.username,
            password: settings.password,
            database: 'ProductsTest',
            entities:  [ User, Product],
            synchronize: false,
            dropSchema: true,
            migrationsRun: true,
            logging: true,
            migrations: [__dirname + '/migrations/**/*.{ts,js}'],
            cli:{
                migrationsDir: 'src/migrations',
                entitiesDir: 'src/entity'
            }
        };
    }
    return OrmConfig;
}