const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(express.json());

const usersRouter = require("./routes/users");
const tasksRouter = require("./routes/tasks")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/users", usersRouter);
app.use("/tasks", tasksRouter);

module.exports = app;
