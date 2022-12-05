const mongoose = require("mongoose");

const subjectstudent = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true
  }
});

// export model user with subjects-
module.exports = mongoose.model("subjectsStudent", subjectstudent);
