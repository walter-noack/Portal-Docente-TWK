const Qualification = require("../model/qualif.model");
const { check, validationResult } = require("express-validator");

const createQualification = async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({
  //     errors: errors.array()
  //   });
  // }

  const { studentCode, subjectCode } = req.body;

  const qualifications = req.body.qualifications;
  console.log(qualifications)
  try {
    let qualification = await Qualification.findOne({
      studentCode, subjectCode
    });
    if (qualification) {
      return res.status(400).json({
        msg: "Qualification already exists",
      });
    }

    qualification = new Qualification({
      studentCode,
      subjectCode,
      qualifications
    });

    await qualification.save();
    res.status(200).json({
      message: "Calificaciones Creadas"
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error in Saving");
  }

};


const getQualification = async (req, res) => {
  Qualification.find({}, "studentCode subjectCode qualifications")
    .then((qualification) => {
      res.status(200).json({
        message: "Las calificaciones son:",
        qualification,
      });
    })
    .catch(() => {
      res.status(500).json({
        ok: false,
        msg: "Get qualifications failed",
      });
    });
};


//**REVISAR**//
const getQualifBySubject = async (req, res) => {
  // console.log(req.params);
  try {
    let _id = req.params.id;
    const subject = await Subject.find({
      _id,
    });

    let qualification= await Qualification.find({});

    const response = [];
    qualification.forEach((data)=>{
      // console.log(data)
      data.subjects.map((sub)=> {
        if(sub == _id)
        response.push(data._id)
      })
    })
    console.log("=======")
    console.log(response)
    console.log("=======")
    res.status(200).json({
      message: `Encontradas las calificaciones de la asignatura`,      
      response
      // studentsSubject,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error in Get");
  }
};


module.exports = {
  createQualification,
  getQualification,
  getQualifBySubject
};