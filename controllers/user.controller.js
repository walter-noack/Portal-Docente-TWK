const User = require("../model/user.model");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
// const { getToken, getTokenData } = require("../config/jwt.config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



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
      errors: errors.array(),
    });
  }

  const { rut, password } = req.body;
  try {
    let user = await User.findOne({
      rut,
    });
    if (!user)
      return res.status(400).json({
        message: "User Not Exist",
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        message: "Incorrect Password !",
      });

      
    const payload = {
      user: {
        id: user.id,
      },
    };

    // console.log(user.firstLogin);
    if (user.firstLogin == 'true') {
      jwt.sign(
      payload,
      "randomString",
      {
        expiresIn: 3600,
      },
      (err, token) => {
        if (err) throw err;
        return res.status(200).json({
          rut,
          message: "Change Password !",
        });
      }
    )
      
    }


    jwt.sign(
      payload,
      "randomString",
      {
        expiresIn: 3600,
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          user,
          token,
        });
      }
    );

  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const updatePassword = async (req, res) => {
  try {
    // Obtener el user
    
    let { rut } = req.body;
    let user = await User.findOne({
      rut,
    });
    
    user.firstLogin = req.body.firstLogin;
    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);

    await user.save();

    
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      "randomString",
      {
        expiresIn: 10000,
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          user,
          token,
        });
      }
    );

  } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        msg: "Error al confirmar usuario",
      });
    }
};

const getUser = async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
};

module.exports = {
  signUpUser,
  login,
  updatePassword,
  getUser,
};
