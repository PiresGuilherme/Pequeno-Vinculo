import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "./Student";

@Entity()
export class Evaluation {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    note: number

    @Column()
    evaluation_date: number

    @ManyToOne(()=> Student, (student) => student.evaluation)
    student : Student[]
}