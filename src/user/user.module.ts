import { Module } from '@nestjs/common';
import { UserController  } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import {UserService} from './user.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([User])
  ],
  exports: [TypeOrmModule.forFeature([User]),UserService],
  controllers: [UserController],
  providers: [UserService],

})
export class UserModule {}