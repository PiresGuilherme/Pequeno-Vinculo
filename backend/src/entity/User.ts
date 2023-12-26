import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from "typeorm"
import { Class } from "./Class"
import { Student } from "./Student"

export type type_user = "RESPONSIBLE"|"TEACHER"|"COORDINATOR"


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    last_name: string

    @Column()
    country_code: number

    @Column()
    area_code: number

    @Column()
    phone_number: number

    @Column()
    address_coutry: string

    @Column()
    address_city: string

    @Column()
    address_neighborhood: string

    @Column()
    address_street: string

    @Column()
    address_complement: string

    @Column()
    postal_code: number

    @Column()
    document: number

    @Column()
    email: string

    @Column()
    password: string

    @Column({type:'date'})
    birth_date: Date

    @Column({
        type:"enum",
        enum:["RESPONSIBLE","TEACHER","COORDINATOR"],
    })
    type_user : type_user

    @OneToMany(() => Class, (classe) => classe.user)
    class : Class

    @ManyToMany(() => Student, student => student.user)
    @JoinTable()
    student : Student[];
}
