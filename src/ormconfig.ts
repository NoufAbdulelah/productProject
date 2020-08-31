import { TypeOrmModuleOptions, TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path';
require('dotenv').config();

const ORMconfig: TypeOrmModuleOptions ={

    type: 'postgres',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    entities:  [join(__dirname, '**', '*.entity.{ts,js}')],
    synchronize: false,
    migrationsRun: true,
    logging: true,
    migrations: [__dirname + '/migrations/**/*.{ts,js}'],
    cli:{
        migrationsDir: 'src/migrations',
        entitiesDir: 'src/entity'
    }

}

export = ORMconfig;