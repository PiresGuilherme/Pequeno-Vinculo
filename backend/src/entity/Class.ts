import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Student } from "./Student";

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

    @OneToMany(() => Student, student => student.class)
    student : Student[];

}