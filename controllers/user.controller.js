const UserMail = require('../model/userMail.model');
const User = require("../model/user.model");
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require("express-validator");
const { getToken, getTokenData } = require('../config/jwt.config');
const { getTemplate, sendEmail } = require('../config/mail.config');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signUpUserMail = async (req, res) => {
    try {

        // Obtener la data del usuario: name, email
        const { rut, name, email } = req.body;

        // Verificar que el usuario no exista
        let userMail = await UserMail.findOne({ email }) || null;

        if(userMail !== null) {
            return res.json({
                success: false,
                msg: 'Usuario ya existe'
            });
        }

        // Generar el código
        const code = uuidv4();

        // Crear un nuevo usuario
        userMail = new UserMail({ rut, name, email, code });

        // Generar token
        const token = getToken({ email, code });

        // Obtener un template
        const template = getTemplate(name, token);

        // Enviar el email
        await sendEmail(email, 'Este es un email de prueba', template);
        await userMail.save();

        res.json({
            success: true,
            msg: 'Registrado correctamente'
        });

    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            msg: 'Error al registrar usuario'
        });
    }
}

const confirm = async (req, res) => {
    try {

       // Obtener el token
       const { token } = req.params;
       
       // Verificar la data
       const data = await getTokenData(token);

       if(data === null) {
            return res.json({
                success: false,
                msg: 'Error al obtener data'
            });
       }

       console.log(data);

       const { email, code } = data.data;

       // Verificar existencia del usuario
       const userMail = await UserMail.findOne({ email }) || null;

       if(userMail === null) {
            return res.json({
                success: false,
                msg: 'Usuario no existe'
            });
       }

       // Verificar el código
       if(code !== userMail.code) {
            return res.redirect('/error.html');
       }

       // Actualizar usuario
       userMail.status = 'VERIFIED';
       await userMail.save();

       // Redireccionar a la confirmación
       return res.redirect('/confirm.html');
        
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            msg: 'Error al confirmar usuario'
        });
    }
}

const signUpUser = async (req, res) => {
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
              msg: "User Already Exists"
            });
          }
    
          user = new User({
            rut,
            email,
            password,
            name,
            lastname
          });
    
          const salt = await bcrypt.genSalt(10);
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
                token
              });
            }
          );
        } catch (err) {
          console.log(err.message);
          res.status(500).send("Error in Saving");
        }
}

const login = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { rut, password } = req.body;
    try {
      let user = await User.findOne({
        rut
      });
      if (!user)
        return res.status(400).json({
          message: "User Not Exist"
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect Password !"
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
            token
          });
        }
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error"
      });
    }
  }

const getUser = async (req, res) => {
    try {
      // request.user is getting fetched from Middleware after token authentication
      const user = await User.findById(req.user.id);
      res.json(user);
    } catch (e) {
      res.send({ message: "Error in Fetching user" });
    }
  }

module.exports = {
    signUpUserMail,
    signUpUser,
    confirm,
    login,
    getUser
}