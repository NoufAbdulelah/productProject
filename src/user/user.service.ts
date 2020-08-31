import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
//import { Product } from '../product/product.entity';
import{Repository}from'typeorm';
import{UserDto} from './interfaces/user.dto'
import {AuthService} from '../auth/auth.service'
import { switchMap, map, catchError} from 'rxjs/operators'
import {from, throwError, Observable } from 'rxjs';
import { NotFoundException } from '@nestjs/common';
import { blacklist } from 'src/auth/blacklist.decorator';
import { userInfo } from 'os';

export class UserService {
    constructor(@InjectRepository(User)
    private readonly UserRepository: Repository<User>,
    private authService : AuthService){}


        create(UserDto: UserDto) {
        return this.authService.hashPassword(UserDto.password).pipe(
          switchMap((passwordHash: string)=>{
            const { name , username ,password,email,role} = UserDto;
            const newUser = new User();
            newUser.name = name;
            newUser.username = username;
            newUser.password=password;
            newUser.email=email;
            newUser.role=role;
            return from(this.UserRepository.save(newUser)).pipe(
              map((user: User) => {
                  const {password, ...result} = user;
                  return result;
              }),
              catchError(err => throwError(err))
                    )
                })
                 )
            }


        findAll(){
          return from(this.UserRepository.find()).pipe(
            map((users: User[]) => {
                users.forEach(function (v) {delete v.password, delete v.blackList});
                return users;
            })
        );

        }

        findOneProd = async (id: number) => {
          return from(this.UserRepository.findOne({id})).pipe(
            map((user: User) => {
                const {password, ...result} = user;
                return result;
            } )
        )

         
        };

        remove= async (id: string) => {
            await this.UserRepository.findOneOrFail(id);
            return this.UserRepository.delete(id);
         };

         update = async (id: string, UserDto: UserDto) => {
            return from(this.UserRepository.save({ ...UserDto, id: Number(id) }))
          };

          login(user: UserDto){
            return this.validateUser(user.email, user.password).pipe(
                switchMap((user: UserDto) => {
                    if(user) {
                        user.blackList=false;
                         this.UserRepository.save(user);
                        return this.authService.generateJwt(user).pipe(map((jwt: string) => jwt));
                    } else {
                        return 'Wrong Credentials';
                    }
                })
            )
        }
    
        validateUser(email: string, password: string) {
            return from(this.UserRepository.findOne({email})).pipe(
                switchMap((user: UserDto) => this.authService.comparePasswords(password, user.password).pipe(
                    map((match: boolean) => {
                        if(match) {
                            const {password, ...result} = user;
                            return result;
                        } else {
                            throw Error;
                        }
                    })
                ))
            )
    
        }
    
        findByMail(email: string){
            return from(this.UserRepository.findOne({email}));
        }



        findOne(id: number): Observable<UserDto> {
            return from(this.UserRepository.findOne({id})).pipe(
                map((user: User) => {
                    const {...result} = user;
                    return result;
                } )
            )
        }


        // logout = async (id: string, UserDto: UserDto) => {
        //     from(this.UserRepository.save({ ...UserDto, id: Number(id) }))
        //     return("you are logged out sucssefully");
        //   };
            

          logout = async (user: UserDto) => {
            return this.validateUser(user.email, user.password).pipe(
                switchMap((user: UserDto) => {
                    if(user) {
                        user.blackList=true;
                        this.UserRepository.save(user);
                         return "logged out...";
                    } else {
                        return "can not logout";
                    }
                })
            )
        }
                //    user.blackList=true;
                //    await this.UserRepository.save(user);
                //    return 'logged out...';
                // };


        



    
    



}
