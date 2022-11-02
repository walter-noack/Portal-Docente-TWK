const express = require("express");
const bodyParser = require("body-parser");
const user = require("./routes/user");
const subject = require("./routes/subject");

const InitiateMongoServer = require("./config/db");

// Initiate Mongo Server
InitiateMongoServer();

const app = express();

// PORT
const PORT = process.env.PORT || 4000;


app.use('/user', require('./routes/user'));
app.use('/subject', require('./routes/subject'));

app.get("/", (req, res) => {
  res.json({ message: "API Funcionando" });
});

app.use("/user", user);
app.use("/subject", subject);

app.listen(PORT, (req, res) => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});