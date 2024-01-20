import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Class } from "./entity/Class"
import { Evaluation } from "./entity/Evaluation"
import { Student } from "./entity/Student"
import { Schedule } from "./entity/Schedule"
import { Attendance } from "./entity/Attendance"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Senac@2021",
    database: "Pequeno Vinculo",
    synchronize: true,
    logging: false,
    entities: [User,Class,Evaluation,Student,Schedule,Attendance],
    migrations: [],
    subscribers: [],
})
