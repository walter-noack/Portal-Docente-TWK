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
  // console.log(req.params);
  try {
    
    const code = req.params.code;
    const subject1 = await Subject.find({ code });
    console.log(subject1)
    let _id = req.params.id;
    const subject = await Subject.find({
      _id,
    });

    let students = await Student.find({});

    const response = [];
    students.forEach((data)=>{
      // console.log(data)
      data.subjects.map((sub)=> {
        if(sub == _id)
        response.push(data)
      })
    })
    // console.log("Estudiantes encontrados")
    // console.log(response)
    // console.log("=======")
    res.status(200).json({
      message: `Encontrados estudiantes de la asignatura ${subject.name} `,      
      response
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
