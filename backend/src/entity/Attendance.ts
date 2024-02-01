import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "./Student";

@Entity()
export class Attendance{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    presence : boolean;

    @Column()
    date_attendance : Date;

    @ManyToOne(()=> Student,student => student.attendance)
    student:Student;
}