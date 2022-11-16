const Student = require ("../model/student.model");
const { check, validationResult } = require("express-validator");
const life_jwt = require("jsonwebtoken");




const createStudent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  const { rut,name, lastname, subjects  } = req.body;
  try {
    let student = await Student.findOne({
      rut
    });
    if (student) {
      return res.status(400).json({
        msg: "Student Already Exists"
      });
    }

    student = new Student({
      rut,
      name,
      lastname,
      subjects
    });

    await student.save();

    const payload = {
      student: {
        id: student.id
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
          message:"estudiante creada"
        });
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error in Saving");
  }
}

app.get("createStudents", function (req, res) {
  Student.find({}, function (err, student) {
    res.status(200).send(student);
  });
});
module.exports = {
  createStudent
}
