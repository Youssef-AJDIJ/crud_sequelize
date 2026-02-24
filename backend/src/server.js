

const {createRequire} = require("module")
const requireESM = createRequire(__filename)
const express = require("express")
const cors = require("cors")
const session = require("express-session")
const MySQLStore = require("express-mysql-session")
const mysql = require("mysql2")
require("dotenv").config()
const authRouter = require("./routers/auth.route")
const astroHandler = require("../../frontend/dist/server/entry.mjs").handler

const app = express()
const Port = process.env.PORT || 3000

const sessionStore = new MySQLStore({
    host: "localhost",
    user: "root",
    password: "",
    database: "book_store"
})

app.use(session({
    key:"astro_session",
    secret: "super_secret_key",
    store: sessionStore,
    resave:false,
    saveUninitialized: false,
    cookie:{
        httpOnly:true,
        sameSite:"lax",
        secure:false,
        maxAge: 1000* 60 * 60 * 24
    }
}))
app.use(express.json())
app.use(cors({
    origin: "http://localhost:4321",
    credentials: true
}))
app.use((req,res,next) =>{
    res.locals.user = req.session.user || null
    next()
})
app.use(astroHandler)
app.get("/", (req, res) =>{
    res.send("home page")
})

app.use("/api/auth", authRouter)


app.listen(Port, ()=>{
    console.log(`The server running on :: http://localhost:${Port}`);
})

// module.exports = app


