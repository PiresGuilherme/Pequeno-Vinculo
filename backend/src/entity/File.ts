import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @ManyToOne(() => Class, classe => classe.file)
    classe: Class;
}