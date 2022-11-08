const Subject =require("../model/subject.model");
const { check, validationResult } = require("express-validator");
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

    subject = new Subject({
      name,
      code,
      teacherCode,
      year,
      semester,
      jornada
    });

    await subject.save();

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

module.exports = {
  createSubject
}