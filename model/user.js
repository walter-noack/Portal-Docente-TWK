const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  rut: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name:{
    type: String,
  },
  lastname:{
    type: String,
  },
  newLogin:{
    type: Boolean,
  }

});

// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);