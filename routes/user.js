const express = require("express");
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../model/User");

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

router.post(
  "/signup",
  [
    check("rut", "Please Enter a Valid RUT")
      .not()
      .isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { rut, email, password, name, lastname } = req.body;
    try {
      let user = await User.findOne({
        email
      });
      if (user) {
        return res.status(400).json({
          msg: "El usuario ya existe"
        });
      }

      user = new User({
        rut,
        email,
        password,
        name,
        lastname,
        newLogin: true
      });

      const salt = await bcrypt.genSalt(8);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 10000
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            // token,
            message: "Usuario creado"
          });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error en el proceso de guardado");
    }
  }
);

router.post(
  "/login",
  [
    check("rut", "Por favor, ingresa un RUT válido").isString(),
    check("password", "Por favor, ingresa una contraseña válida").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.message
      });
    }

    const { rut, password } = req.body;
    try {
      let user = await User.findOne({
        rut
      });
      if (!user)
        return res.status(400).json({
          message: "Usuario no existe"
        });

      if (user.newLogin = true) {
        return res.status(201).json({
          isNewUser: 'true',
          message: "204: Cambio de contraseña"
        })
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: "Contraseña incorrecta!"
        });

      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            message: "200: Logueado correctamente"
          });
        }
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Error de Servidor"
      });
    }
  }
);

router.post(
  "/changePassNewUser",
  [
    check("rut", "Por favor, ingresa un RUT válido").isString(),  
    check("password", "Por favor, ingresa una contraseña válida").isLength({
    min: 6
  })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.message
      });
    }

    const { rut, password } = req.body;
    try {
      
      let user = await User.findByIdAndUpdate({
        rut,
      });
      console.log(user)
      if (newLogin = true) {
        var newvalues = { $set: { newLogin: false } }

        user.save(newvalues, password, function (err) {
          if (err) throw err;
          res.status(200).json({
            message: "201: Contraseña Cambiada"
          });
        });
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Error de Servidor"
      });
    }
  }
)








/**
 * @method - POST
 * @description - Get LoggedIn User
 * @param - /user/me
 */

router.get("/me", auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});

module.exports = router;