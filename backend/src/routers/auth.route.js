const router = require("express").Router();
const Model = require("../models");
const formatSequelizeError = require("../middlewares/handlerErrorSequelize");

// signup

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newuser = await Model.User.create({
      username,
      email,
      password,
    });
    if (!newuser) {
      return res.status(400).json({
        success: false,
        msg: "Can't create the user",
      });
    }

    return res.status(201).json({
      success: true,
      msg: "user created successfuly",
      data: newuser,
    });
  } catch (error) {
    if (error.errors) {
      return res.status(400).json({
        success: false,
        errors: formatSequelizeError(error),
      });
    }

    res.status(500).json({
      success: false,
      msg: "Can't connect with server",
    });
  }
});

// login

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Model.User.findOne({
      where: { email: email },
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "incorrectos datos",
      });
    }
    if(user.email !== email || user.password !== password){
        return res.json({
            success: false,
            msg: "contraseña incorrecta"
        })
    }
    if(user.email === email && user.password === password){
        req.session.user = {
          username: user.username,
          email: user.email,
          isLoggedin : true
        }
        return res.status(200).json({
          success: true,
          msg: "Login successfuly",
          data: user,
        });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Can't connect with server",
    });
  }
});
// logout
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).send("Error al cerrar sesión");
    res.clearCookie('connect.sid'); // Nombre por defecto de la cookie de sesión
    res.send("Sesión cerrada");
  });
});

module.exports = router;
