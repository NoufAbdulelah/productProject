import{Entity, Column,ManyToOne, JoinColumn, PrimaryGeneratedColumn, CreateDateColumn}from 'typeorm';
//import{BaseEntity} from'src/base-entity'
import { IsInt,IsNotEmpty, IsString} from "class-validator";
import { User } from './user.entity';


@Entity('productsInfo')
export class Product{

    @PrimaryGeneratedColumn()
    id?:number;
    @CreateDateColumn({nullable: true})
    createdAt?: Date;
    @CreateDateColumn({nullable: true})
    updatedAt?: Date;

    @IsString()
    @IsNotEmpty()
    @Column({type:'varchar', length:100, nullable:false})
    title: string;

    @IsString()
    @IsNotEmpty()
    @Column({type:'varchar', length:100, nullable:true})
    description: string;

    @IsInt()
    @Column({type:'varchar', default:null, nullable:true})
    price:number

    // @IsInt()
    // @Column({type:'varchar', default:null, nullable:true})
    // test:number


    @ManyToOne(() => User, (user: User) => user.poducts)
    @JoinColumn()
    public u:User;

}

export default Product;