const mongoose = require("mongoose")

const StudentsSchema = mongoose.Schema({
    rut: { type: String, required: true  },
    name: { type: String, required: true,  },
    lastname: { type: String, required: true, },
    subjects: [{type:Schema.ObjectId,refs:"createSubject"}],
  });
  
  // export model user with StudentsSchema
  module.exports = mongoose.model("student", StudentsSchema);
  