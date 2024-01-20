import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Class } from "./Class";
import { User } from "./User";
import { Evaluation } from "./Evaluation";
import { Attendance } from "./Attendance";

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    last_name: string

    @Column()
    birth_date: Date
    
    @Column()
    document: number

    @Column()
    coin:number

    @ManyToOne(() => Class, classe => classe.student)
    classe: Class

    @ManyToMany(() => User, user => user.student)
    user: User[];

    @OneToMany(()=> Evaluation, (evaluation) => evaluation.student)
    evaluation : Evaluation[]

    @ManyToOne(()=> Attendance,attendance => attendance.student)
    attendance:Attendance[];

}