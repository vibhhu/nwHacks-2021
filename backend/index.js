const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(express.json());

const usersRouter = require("./routes/users");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/users", usersRouter);

module.exports = app;
