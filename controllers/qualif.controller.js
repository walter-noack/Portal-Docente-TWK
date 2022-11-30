const Qualification = require("../model/qualif.model");
const { check, validationResult } = require("express-validator");

const createQualif = async (req, res) => {


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
  

    const { studentCode, subjectstudent } = req.body;
    const qualification = req.body.qualification;
    console.log(qualification)
    try {
      let qualification = await Qualification.findOne({
        studentCode,
      });
      if (student) {
        return res.status(400).json({
          msg: "Qualification already exists",
        });
      }
  
      qualification = new Qualification({
        studentCode,
        subjectstudent,
        qualification
      });
  
      await student.save();
      res.status(200).json({
        message: "Calificación Creada"
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
    
  };

  module.exports = {
    createQualification,
  };