const debug = require("debug");
const logger = debug("db:error");
const express = require("express");
const app = require("./index.js");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/test", { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on("error", (error) => logger(error));
db.once("open", () => logger("Database connected"));

app.listen(8000, () => logger("Server started"));
