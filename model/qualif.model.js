const mongoose = require("mongoose");

const QualifSchema = mongoose.Schema({
  studentCode: { type: String, required: true },
  subjectCode: { type: String, required: true },
  qualifications: [{ type: Number }],
});

// export model user with StudentsSchema
module.exports = mongoose.model("Qualification", QualifSchema);
