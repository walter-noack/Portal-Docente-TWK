const express = require("express");
const bodyParser = require("body-parser");
const user = require("./routes/user");
const InitiateMongoServer = require('./src/config/db.config');
const subject = require("./routes/subject");

// Initiate Mongo Server
InitiateMongoServer();

const app = express();

// PORT
const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "API Funcionando" });
});

/**
 * Router Middleware
 * Router - /user/*
 * Method - *
 */
app.use("/user", user);
app.use("/subject", subject);

app.listen(PORT, (req, res) => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});