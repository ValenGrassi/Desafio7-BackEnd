import express from "express"
import {engine} from "express-handlebars"
import routerViews from "./routers/routerViews.js"
import mongoose from "mongoose"
import MongoStore from "connect-mongo"
import session from "express-session"
import { passportInitialize, passportSession } from "./middlewares/passport.js"
import { apiRouter } from "./routers/apiRouter.js"
import { COOKIE_SECRET, MONGODB_CNX_STR, PORT } from "./config/config.js"
import cookieParser from "cookie-parser"

const app = express()

const connection = mongoose.connect(MONGODB_CNX_STR,({
    useNewUrlParser: true,
    useUnifiedTopology: true
}))

app.engine("handlebars", engine())
app.set("views", "./views")
app.set("view engine", "handlebars")

app.use(cookieParser(COOKIE_SECRET ))

app.use(express.json())
app.use(express.static("./public"))
app.use(express.urlencoded({ extended: true }))


app.use(session({
    store: new MongoStore({
        mongoUrl: MONGODB_CNX_STR,
        ttl: 3600
    }),
    secret: "secretito",
    resave: false,
    saveUninitialized: false
}))

app.use(passportInitialize, passportSession)

app.use("/", routerViews)
app.use("/api", apiRouter)

app.listen(PORT, () => {console.log(`conectado a ${PORT}`)})