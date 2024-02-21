import "reflect-metadata"
import { AppDataSource } from "./data-source"
import server from "./server"
import { router as userRouter } from "./routes/userRoutes";
import { router as studentRouter } from "./routes/studentRoutes";
import { router as classRouter } from "./routes/classRoutes";
import { router as evaluationRouter } from "./routes/evaluationRoutes";
import { router as scheduleRouter } from "./routes/scheduleRoutes";
import { router as attendanceRouter } from "./routes/attendanceRoutes";
import { router as notificationRouter } from "./routes/notificationRoutes";

import cors from 'cors';


// verificar se é possível utilizar somente 1 roteador para encaminhar para os 4
///////importante //////
server.use(cors());
server.use('/api', userRouter);
server.use('/api', studentRouter);
server.use('/api', classRouter);
server.use('/api', evaluationRouter);
server.use('/api', scheduleRouter);
server.use('/api', attendanceRouter);
server.use('/api', notificationRouter)

AppDataSource.initialize().then(async () => {

    server.listen(3000, () => {
        console.log('ouvindo')
            // console.log(Date());
            ;
    })
}).catch(error => console.log(error))
