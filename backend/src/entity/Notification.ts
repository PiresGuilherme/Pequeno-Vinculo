import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Notification {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    message: string;

    @Column()
    verified: boolean

    @Column({ type: Date })
    notification_date: Date

    @ManyToOne(() => User, user => user.notification)
    user: User
}