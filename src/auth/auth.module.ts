import { Module, forwardRef } from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {ConfigModule, ConfigService} from '@nestjs/config'
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { RolesGuard } from './ roles.guard';
import { JwtAuthGuard } from './jwt-guard';
import { JwtStrategy } from './jwt-strategy';
import { UserModule } from 'src/user/user.module';
import { blacklistGuard } from './blacklist.guard';


@Module({
    imports: [
        forwardRef(() => UserModule),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: jwtConstants.secret,
                signOptions: {expiresIn: '10000s'}
            })
        })
    ],
    providers: [AuthService, JwtStrategy, RolesGuard, JwtAuthGuard , blacklistGuard],
    exports: [AuthService]
})
export class AuthModule { }

