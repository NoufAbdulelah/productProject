import { Injectable } from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import { Observable, from, of } from 'rxjs';
import{UserDto} from 'src/user/interfaces/user.dto'
import { request } from 'http';

const bcrypt= require('bcrypt');

@Injectable()
export class AuthService {

    constructor(private readonly JwtSercive: JwtService){}

    generateJwt(user: UserDto): Observable<string> {
        return from(this.JwtSercive.signAsync({user}));
    }

    hashPassword(password:string): Observable<string>{
        return from<string>(bcrypt.hash(password,12));
    }

    comparePasswords(newPassword:string, passwordHash:string): Observable<any|boolean>{
        return of <any| boolean>(bcrypt.compare(newPassword,passwordHash));
    }

}