const Subject =require("../model/subject.model");
const subjectsStudent =require("../model/subjects-student.model");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const createSubject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  const { name, code, teacherCode, year, semester, jornada } = req.body;
  try {
    
    let subject = await Subject.findOne({
      code
    });
    if (subject) {
      return res.status(400).json({
        msg: "Subject Already Exists"
      });
    }
    let subjectsShort = await subjectsStudent.findOne({
      code
    });
    if (subjectsShort) {
      return res.status(400).json({
        msg: "Subject-Student Already Exists"
      });
    }

    subject = new Subject({
      name,
      code,
      teacherCode,
      year,
      semester,
      jornada
    });
    subjectShort = new subjectsStudent({
      name,
      code
    });

    await subject.save();
    await subjectShort.save();

    const payload = {
      subject: {
        id: subject.id
      }
    };

    jwt.sign(
      payload,
      "randomString",
      {
        expiresIn: 10000
      },
      (err) => {
        if (err) throw err;
        res.status(200).json({
          message:"Asignatura creada"
        });
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error in Saving");
  }
}

const viewSubject = async (req, res) =>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }
  try {
      // http://localhost:4000/subject/viewSubject
      const teacherCode = req.params.rut;
      const subject = await Subject.find({ teacherCode });
      res.json(subject);
      } catch (e) {
        res.send({ message: "Error in Fetching subject" });
      }
  }

module.exports = {
  createSubject,
  viewSubject
}