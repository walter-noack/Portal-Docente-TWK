const router = require('express').Router();
const { check } = require("express-validator");
const UserController = require('../controllers/user.controller');
const auth = require("../middleware/auth");

router.post(
    '/signupMail',
    [],
    UserController.signUpUserMail
);

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
    UserController.signUpUser
  );

router.get(
    '/confirm/:token',
    [],
    UserController.confirm
);

router.get(
    "/me",
    auth, 
    UserController.getUser
    );

router.post(
    "/login",
    [
      check("rut", "Please enter a valid RUT").isString(),
      check("password", "Please enter a valid password").isLength({
        min: 6
      })
    ],
    UserController.login
  );


module.exports = router;