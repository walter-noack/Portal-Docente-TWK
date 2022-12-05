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

  module.exports = {
    createQualification,
  };