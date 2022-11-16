const mongoose = require("mongoose")

const QualificationsSchema = mongoose.Schema({
    subjects: [{type:Schema.ObjectId,refs:"createSubject"}],
    students: [{type:Schema.ObjectId,refs:"createStudent"}],
    note_01: { type: String, required: true  },
    note_02: { type: String, required: true,  },
    note_03: { type: String, required: true, },
    note_04: { type: String, required: true, },


  });
  
  // export model user with QualificationsSchema
  module.exports = mongoose.model("qualification", QualificationsSchema);
  