const router = require("express").Router();
const { check } = require("express-validator");

const SubjectController = require("../controllers/subject.controller");
const auth = require("../middleware/auth");

/**
 * @method - POST
 * @param - /createsubject
 * @description - Subject SignUp
 */

 router.get("/byTeacher/:rut", [], SubjectController.viewSubjectByTeacher);

 router.get("/byCode/:code", [], SubjectController.viewSubjectByCode);

router.post(
  "/createsubject",
  [
    check("name", "Please enter a valid name").not().isEmpty(),
    check("code", "Please enter a valid code"),
    check("teacherCode", "Please enter a valid RUT"),
    check("year", "Please Enter a Valid year"),
    check("semester", "Please Enter a valid semester"),
    check("jornada", "Please Enter a valid jornada"),
  ],
  SubjectController.createSubject
);

module.exports = router;
