const router = require('express').Router();
const { check, validationResult } = require("express-validator");

const SubjectController = require('../controllers/subject.controller');
const auth = require("../middleware/auth");

/**
 * @method - POST
 * @param - /createsubject
 * @description - Subject SignUp
 */

 router.post(
    "/createsubject",
    [
      check("name", "Please enter a valid name")
        .not()
        .isEmpty(),
      check("code", "Please enter a valid code"),
      check("teacherCode", "Please enter a valid RUT"),
      check("year", "Please Enter a Valid year"),
      check("semester" , "Please Enter a valid semester"),
      check("jornada", "Please Enter a valid jornada"),
    ],
    SubjectController.createSubject
  );

  
  // router.get(
  //   "/dashboard",
  //       [
  //         check("rut", "Please enter a valid RUT").isString(),
          
  //       ],


  //       async (req, res) => {
  //         const errors = validationResult(req);
      
  //         if (!errors.isEmpty()) {
  //           return res.status(400).json({
  //             errors: errors.array()
  //           });
  //         }
      
  //         const { teacherCode } = req.body;
  //         try {
  //           let user = await Subject.findOne({
  //             teacherCode
  //           });
  //           if (!user)
  //             return res.status(400).json({
  //               message: "No hay asignaturas para este RUT"
  //             });
              
  //             const payload = {
  //               subject: {
  //                 subjectTeacher: Subject.teacherCode
  //               }
  //             };
  //             jwt.sign(
  //               payload,
  //               "randomString",
  //               {
  //                 expiresIn: 3600
  //               },
  //               (err) => {
  //                 if (err) throw err;
  //                 res.status(200).json({
                    
  //                 });
  //               }
  //             );
  //           } catch (e) {
  //             console.error(e);
  //             res.status(500).json({
  //               message: "Server Error"
  //             });
  //           }
  //         }
  //       );
  


module.exports = router;

