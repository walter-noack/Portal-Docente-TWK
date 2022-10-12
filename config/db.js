const mongoose = require("mongoose");

// Replace this with your MONGOURI.
const MONGOURI = "mongodb+srv://adminTWK:adminTWK@cluster0.eqwkvz7.mongodb.net/test";

const DBConnect = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true
    });
    console.log("¡Conectado a la BBDD!");
  } catch (e) {
    console.log(e);
    throw e; 
  }
};

module.exports = DBConnect;