const mongoose = require("mongoose")

const QualifSchema = mongoose.Schema({
    studentCode: { type: String, required: true  },
    subjectstudents: { type: String, required: true  },
    qualification: [{
        type: mongoose.Schema.Types.Number,
        refs: "Qualification",
        autopopulate: true
      }],
  });
  
  // export model user with StudentsSchema
  module.exports = mongoose.model("Qualification", QualifSchema);