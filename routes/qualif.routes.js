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
    [ ],
    QualifController.createQualification
  );


  router.get(
    "/",
    [ ],
    QualifController.getQualification
  );

  router.get(
    "/qualifBySubject/:subjectCode",
    [],
    QualifController.getQualifBySubject
  );

  module.exports = router;