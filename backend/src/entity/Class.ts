import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Student } from "./Student";
import { Schedule } from "./Schedule";

export type shift = "AFTERNOON" | "NIGHT" | "MORNING";

@Entity()
export class Class {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name : string;

    @Column()
    capacity: number

    @Column({
        type : "enum",
        enum: ["AFTERNOON","NIGHT", "MORNING"]
    })
    shift : shift

    @ManyToOne(() => User, user => user.class)
    user : User[];

    @OneToMany(() => Student, student => student.classe)
    student : Student[];
    
    @OneToMany(()=> Schedule, schedule => schedule.classe, {eager:true})
    schedule: Schedule[]
}