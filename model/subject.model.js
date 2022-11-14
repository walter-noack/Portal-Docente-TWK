const mongoose = require("mongoose");

const SubjectSchema = mongoose.Schema({
  name: { type: String, required: true  },
  code: { type: String, required: true,  },
  teacherCode: { type: String, required: true, },
  year: { type: String, },
  semester: { type: String, },
  jornada: { type: String,  },
});

// export model user with SubjectsSchema
module.exports = mongoose.model("subject", SubjectSchema);
