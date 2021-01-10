const debug = require("debug");
const logger = debug("db:error");
const express = require("express");
const app = require("./index.js");
const mongoose = require("mongoose");

const port = process.env.PORT || 8080;

mongoose.connect("mongodb+srv://username:nwhacks2021@cluster0.ckd2z.mongodb.net/nwhacks?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on("error", (error) => logger(error));
db.once("open", () => logger("Database connected"));

app.listen(port, () => logger("Server started"));
