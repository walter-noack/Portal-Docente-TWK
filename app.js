const express = require("express");
const { connectDB } = require('./config/db.config');
const bodyParser = require("body-parser");
const cors = require('cors');
const user = require("./routes/user.routes");
const subject = require("./routes/subject.routes");

const app = express();
app.use(cors());
connectDB();

// PORT
const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

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