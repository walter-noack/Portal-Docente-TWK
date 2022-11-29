const router = require('express').Router();
const { check, validationResult } = require("express-validator");

const StudentController = require('../controllers/student.controller');
const auth = require("../middleware/auth");

/**
 * @method - POST
 * @param - /createstudent
 * @description - Student SignUp
 */

 router.post(
    "/createstudent",
    [
      // check("rut", "Please enter a valid rut")
      //   .not()
      //   .isEmpty(),
      // check("name", "Please enter a valid name"),
      // check("lastname", "Please enter a valid lastname"),
      // check("subject", "Please Enter a Valid subject"),
    ],
    StudentController.createStudent

  );