const mongoose = require("mongoose")

const StudentsSchema = mongoose.Schema({
    rut: { type: String, required: true  },
    name: { type: String, required: true  },
    lastname: { type: String, required: true },
    // subjects: [{type: String}]
    // subject: [{type:Schema.SubjectId,refs:"Subject"}],
    // ingredientes: [{type: Schema.Types.ObjectId, ref: 
      // 'IngredientesSchema'}],
  });
  
  // export model user with StudentsSchema
  module.exports = mongoose.model("student", StudentsSchema);