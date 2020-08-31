import{Entity, Column,PrimaryGeneratedColumn,OneToMany,JoinTable, BeforeInsert}from 'typeorm';
import { Product } from './product.entity';
import { UserRole } from '../user/interfaces/user.dto';
import { string } from '@hapi/joi';
import { ApiProperty } from '@nestjs/swagger'




@Entity('usersInfo')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  @ApiProperty({type:string, description:'password'})
  password: string;

  @Column()
  @ApiProperty({type:string, description:'email'})
  email: string;


  @Column({type: 'enum', enum: UserRole, default: UserRole.USER})
    role: UserRole;

  @Column({default:false, nullable:true})
  blackList: boolean;


  @BeforeInsert()
  emailToLoweCase(){
    this.email.toLowerCase();
  }

  @OneToMany(type => Product, product => product.u, { cascade: true })
  poducts: Promise<Product[]>;


}
export default User;