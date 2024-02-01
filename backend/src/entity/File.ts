import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Class } from "./Class";

@Entity()
export class File {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    url: string;

    @ManyToMany(() => Class, classe => classe.file)
    classe:Class;
}