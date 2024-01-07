import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Class } from "./Class";

@Entity()
export class Schedule {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    schedule_date : Date;

    @Column()
    message : string;

    @ManyToOne(()=> Class, classe => classe.schedule)
    classe : Class
}