const router = require("express").Router();
const { check, validationResult } = require("express-validator");

const QualifController = require('../controllers/student.controller');
const auth = require("../middleware/auth");

/**
 * @method - POST
 * @param - /createqualif
 * @description - Qualification Creation
 */

 router.post(
    "/createqualif",
    [
      check("studentCode", "Please enter a valid rut")
        .not()
        .isEmpty(),
      check("subjectstudents", "Please enter a valid code"),
      check("qualification", "Please enter a valid qualification"),
      
    ],
    QualifController.createQualif
  );

  module.exports = router;