import connect from "./DB/connect.js"
import authRouter from "./modules/auth/auth.routes.js"
// import userRouter from "./modules/user/user.routes.js"
import helmet from "helmet"
import { limiterForAuth, limiterForUser, limiterForComment, limiterForPost } from "./utils/rateLimiter.js"
// import compression from "compression"
import { corsMiddleware } from './utils/cors.js';
import deviceRouter from './modules/device/device.routes.js'

const bootstrap = async (app, express) => {
    app.use(express.json())
    app.use(helmet())
    app.use(corsMiddleware);
    app.use('/device', deviceRouter);

    // app.use(compression())
    app.get("/", (req, res) => {
    res.json({ message: "Nabta Backend is running" })
})
    
    await connect()




    app.use('/auth', limiterForAuth, authRouter)
    // app.use("/user", limiterForUser, userRouter)


    app.use((req, res) => {
        res.status(404).json({ message: "route not found" })
    })

    app.use((error, req, res, next) => {
        const status = error.code === 11000 ? 409 : error.cause || 500
        res.status(status).json({
            message: error.code === 11000 ? "Email, username or phone is already registered" : error.message
        })
})

}

export default bootstrap