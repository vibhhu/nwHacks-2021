const mongoose = require("mongoose");

//Defines the schema for a user
const userSchema = new mongoose.Schema({
	firstname: {
		type: String
	},
	lastname: {
		type: String
	},
	email: {
		type: String
    },
    tasks: [String]
}, { collection: "userDB" });

module.exports = mongoose.model("User", userSchema);
