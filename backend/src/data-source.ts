import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Class } from "./entity/Class"
import { Evaluation } from "./entity/Evaluation"
import { Student } from "./entity/Student"
import { Schedule } from "./entity/Schedule"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin",
    database: "Pequeno Vinculo",
    synchronize: true,
    logging: false,
    entities: [User,Class,Evaluation,Student,Schedule],
    migrations: [],
    subscribers: [],
})
