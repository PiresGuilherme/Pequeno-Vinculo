import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Class } from "./Class";

@Entity()
export class File {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    fieldname: string;

    @Column()
    originalname: string;

    @Column()
    encoding: string;

    @Column()
    mimetype: string;

    @Column()
    destination: string;

    @Column()
    filename: string;

    @Column()
    path: string;
    
    @Column()
    size: number

    @ManyToMany(() => Class, classe => classe.file)
    classe: Class;
}