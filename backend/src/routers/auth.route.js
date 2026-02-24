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

    return res.status(400).json({
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
      where: { email: "example@example.com" },
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "incorrectos datos",
      });
    }
    if(user.email === email && user.password === password){
        req.session.user = {
            username: user.username,
            isLoggedin : true
        }
        return res.status(200).json({
          success: true,
          msg: "Login successfuly",
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

module.exports = router;
