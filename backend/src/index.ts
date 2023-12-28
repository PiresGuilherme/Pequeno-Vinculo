import "reflect-metadata"
import { AppDataSource } from "./data-source" 
import server  from "./server"
import { router as userRouter } from "./routes/userRoutes";
import { router as studentRouter } from "./routes/studentRoutes";
import { router as classRouter } from "./routes/classRoutes";
import { router as evaluationRouter } from "./routes/evaluationRoutes";



// verificar se é possível utilizar somente 1 roteador para encaminhar para os 4
///////importante //////
server.use('/api', userRouter);
server.use('/api', studentRouter)
server.use('/api', classRouter)
server.use('/api', evaluationRouter)



server.listen(3000,()=> {
        console.log('ouvindo');           
})

AppDataSource.initialize().then(async () => {

    // console.log("Inserting a new user into the database...")
    // const user = new User()
    // user.firstName = "Timber"
    // user.lastName = "Saw"
    // user.age = 25
    // await AppDataSource.manager.save(user)
    // console.log("Saved a new user with id: " + user.id)

    // console.log("Loading users from the database...")
    // const users = await AppDataSource.manager.find(User)
    // console.log("Loaded users: ", users)

    // console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))
