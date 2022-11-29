const Student = require("../model/student.model");
const { check, validationResult } = require("express-validator");
// const Life_is = require("jsonwebtoken");

const createStudent = async (req, res) => {
  
  let student = new Student(req.body);
  console.log(student);

  student.save().
  then(() => {
      res.status(201).json({
        ok: true,
        student,
      });
    })
    .catch(() => {
      res.status(500).json({
        ok: false,
        msg: "Create student failed",
      });
    });

  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({
  //     errors: errors.array()
  //   });
  // }

  // const { rut, name, lastname } = req.body;
  // // const Itemsubjects = { ObjectId,Subject };
  // try {
  //   let student = await Student.findOne({
  //     rut,
  //   });
  //   if (student) {
  //     return res.status(400).json({
  //       msg: "Student Already Exists",
  //     });
  //   }

  //   student = new Student({
  //     rut,
  //     name,
  //     lastname,
  //     // subjects
  //   });

  //   await student.save();
    // res.status(200).json({
    //   message: "estudiante creada"
    // });
  // } catch (err) {
  //   console.log(err.message);
  //   res.status(500).send("Error in Saving");
  // }
  
};

// app.get("createStudents", function (req, res) {
//   Student.find({}, function (err, student) {
//     res.status(200).send(student);
//   });
// });

module.exports = {
  createStudent,
};
