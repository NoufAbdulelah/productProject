import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards, Patch} from '@nestjs/common';
import { UserDto, UserRole } from './interfaces/user.dto';
import { UserService } from './user.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { hasRoles } from '../auth/ roles.decorator';
import { blacklist } from '../auth/blacklist.decorator';
import { JwtAuthGuard } from '../auth/jwt-guard';
import { RolesGuard } from '../auth/ roles.guard';
import { blacklistGuard } from '../auth/blacklist.guard';
import {ApiCreatedResponse, ApiOkResponse, ApiUnauthorizedResponse, ApiBody} from '@nestjs/swagger'
import {User} from '../entity/user.entity'


@Controller('users')

export class UserController {
  constructor(
     private readonly userService: UserService) {}

    @Post()
    @ApiCreatedResponse({description:'User Registration'})
    async create(@Body() userDto: UserDto):Promise<any> {
      return this.userService.create(userDto).pipe(
        map((ususerDtoer: UserDto) => userDto),
        catchError(err => of({ error: err.message }))
    );

    }

    @Post('login')
    @ApiOkResponse({description:'User Login'})
    @ApiUnauthorizedResponse({description:'Invalid Credentials'})
    @ApiBody({type:User})
    login(@Body() user: UserDto) {
        return this.userService.login(user).pipe(
            map((jwt: string) => {
                return { access_token: jwt };
            })
        )
    }
    
    @hasRoles(UserRole.ADMIN)
    @blacklist(false)
    @UseGuards(JwtAuthGuard, RolesGuard, blacklistGuard)
    @Get()
        async findAll():Promise<any> {
        return this.userService.findAll();
            }

    @Get(':id')
        async findOne(@Param('id') id: string):Promise<any> {
        }

    @Put(':id')
        async update(@Param('id') id: string, @Body() userDto: UserDto):Promise<any>{
        return this.userService.update(id, userDto);
    }

    @Delete(':id')
        async delete(@Param('id') id: string):Promise<any> {
        return this.userService.remove(id);
    }

    @Post('logout')
    @ApiOkResponse({description:'User Logout'})
    logout(@Body() user: UserDto){
        return this.userService.logout(user);

    }


}