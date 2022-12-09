const Qualification = require("../model/qualif.model");
const Subject = require("../model/subject.model");
const Student = require("../model/student.model");
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
    let subjectCode = req.params.subjectCode;
    // const subject = await Subject.find({
    //   code,
    // });
    // console.log(subject);
    let qualification= await Qualification.find({ subjectCode });
    // console.log(qualification);
    // const response = [];
    // qualification.forEach((data)=>{
    //   console.log(data)
    //   // data.subjectCode.map((sub)=> {
    //     if(data.subjectCode == code)
    //     response.push(data._id)
    //   })
  
    // console.log("=======")
    // console.log(response)
    // console.log("=======")
    res.status(200).json({
      message: `Encontradas las calificaciones de la asignatura`,      
      // response,
      qualification
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error in Get");
  }
};

const getQualifByStudent = async (req, res) => {
    
  try {
    let studentCode = req.params.studentCode;
    let qualification= await Qualification.find({ studentCode });
    res.status(200).json({
      message: `Encontradas las calificaciones del estudiante`, 
      qualification
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error in Get");
  }
  }


module.exports = {
  createQualification,
  getQualification,
  getQualifBySubject,
  getQualifByStudent
};