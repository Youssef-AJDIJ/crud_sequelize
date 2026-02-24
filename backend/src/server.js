const express = require("express")
const cors = require("cors")
const session = require("express-session")
// const MySQLStore = require("express-mysql-session")
require("dotenv").config()
const authRouter = require("./routers/auth.route")

const isLogged = false

const app = express()
app.use(express.json())
app.use(cors({
    origin: "http://localhost:4321",
    credentials: true
}))
const Port = process.env.PORT || 3000

// const sessionStore = new MySQLStore({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "book_store"
// })

  app.use(session({
      key:"astro_session",
      secret: "super_secret_key",
      resave:false,
      saveUninitialized: false,
      cookie:{
          httpOnly:true,
          sameSite:"lax",
          secure:false,
          maxAge: 1000* 60 * 60 * 24
      }
  }))

app.use((req,res,next) =>{
    res.locals.user = req.session.user || null
    next()
})
// Ejemplo de una ruta para obtener los datos del usuario actual
app.get("/api/profile", (req, res) => {
  // Verificamos si existe la sesión y el objeto user
  if (req.session.user && req.session.user.isLoggedin) {
    return res.json({
      success: true,
      user: req.session.user // Aquí tendrás el username y el email
    });
  } else {
    return res.status(401).json({
      success: false,
      msg: "No autenticado o sesión expirada"
    });
  }
});

app.get("/", (req, res) =>{
    res.send("home page")
})

app.use("/api/auth", authRouter)


app.listen(Port, ()=>{
    console.log(`The server running on :: http://localhost:${Port}`);
})




