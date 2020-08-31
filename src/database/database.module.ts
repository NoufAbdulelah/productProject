import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { getOrmConfig } from './database-ormconfig.constant';
import { DatabaseService } from './database.service';
import {UserService} from '../user/user.service'
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(getOrmConfig()),
    UserService
  ],
  providers: [
    DatabaseService,
  ],
  exports: [
    DatabaseService
  ]
})
export class DatabaseModule { }