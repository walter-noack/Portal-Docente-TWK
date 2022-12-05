const router = require("express").Router();
const { check, validationResult } = require("express-validator");

const QualifController = require('../controllers/qualif.controller');
const auth = require("../middleware/auth");

/**
 * @method - POST
 * @param - /createqualif
 * @description - Qualification Creation
 */

 router.post(
  "/createqualif",
    [
      // check("studentCode", "Please enter a valid rut")
      //   .not()
      //   .isEmpty(),
      // check("subjectCode", "Please enter a valid code"),
      // check("qualifications", "Please enter a valid qualification"),
    ],
    QualifController.createQualification
  );

  module.exports = router;