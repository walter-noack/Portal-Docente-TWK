const express = require('express');
const app = express();
const express = require("express");
const bodyParser = require("body-parser");
const user = require("./routes/user");
const InitiateMongoServer = require("./config/db");
const subject = require("./routes/subject");

InitiateMongoServer();

const PORT = process.env.PORT || 4000;


app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use("/user", user);
app.use("/subject", subject);

app.listen(PORT, (req, res) => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});


app.get("/", (req, res) => {
  res.json({ message: "API Funcionando" });
});


