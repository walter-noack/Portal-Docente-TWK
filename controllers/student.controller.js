const Student = require("../model/student.model");
const { validationResult } = require("express-validator");
const Subject = require("../model/subject.model");
// const Life_is = require("jsonwebtoken");

const createStudent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  // console.log(req.body)
  const { rut, name, lastname } = req.body;

  
  const subjects = req.body.subjects;
  try {
    let student = await Student.findOne({
      rut,
    });
    if (student) {
      return res.status(400).json({
        msg: "Student Already Exists",
      });
    }

    // Filtrar que no se ingresen asignaturas repetidas.

    student = new Student({
      rut,
      name,
      lastname,
      subjects,
    });

    await student.save();
    res.status(200).json({
      message: "estudiante creada",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error in Saving");
  }
};

const getStudents = async (req, res) => {
  Student.find({}, "rut name lastname subjects")
    .then((students) => {
      res.status(200).json({
        message: "Encontrados todos los estudiantes",
        students,
      });
    })
    .catch(() => {
      res.status(500).json({
        ok: false,
        msg: "Get students failed",
      });
    });
};

const getStudentBySubject = async (req, res) => {
  console.log(req.params);
  try {
    let _id = req.params.id;
    const subject = await Subject.find({
      _id,
    });
    let subjectListStudent = await Student.find({ subjects: subject._id }).
    populate('student').
    exec(function (err, student) {
      if (err) return handleError(err);
      console.log( student.subjects.name);
      // prints "The author is Ian Fleming"
    });

  //   Subject.findOne({code:"ARQ-03"}).exec(function(err,stu){
  //     subject.student=stu._id;
  //     subject.save();
  //     studentModel.updateOne({_id:stu._id},{$push:{subject:subject._id}}).exec();
  // })

    // Student.find({
    //   subjects: {
    //     $elemMatch: student.subject[i].id,
    //   },
    // });

    // let studentsSubject = [];
    // students.forEach((student) => {
    //   console.log(student.subjects);
    //   let subjectsStudent =student.subjects;
    //   subjectsStudent.forEach((subjectID) => {
    //     if(subjectID = _id) {
    //       studentsSubject.push(student);
    //     }
    //   });
    // });

    res.status(200).json({
      message: `Encontrados estudiantes de la asignatura ${subject.code} `,      
      subject,
      students,
      // studentsSubject,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error in Get");
  }
};

module.exports = {
  createStudent,
  getStudentBySubject,
  getStudents,
};
