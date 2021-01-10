const mongoose = require("mongoose");

//Defines the schema for a user
const taskSchema = new mongoose.Schema({
	id: {
		type: String
	},
	title: {
		type: String
	},
	totalEstimatedTime: {
		type: Number
	},
	totalActualTime: {
		type: Number
	},
	priority: {
		type: Number
	},
	productivityScore: {
		type: Number
	},
	latestChangeTime: {
		type: Number
	},
	status: {
		type: Boolean
	},
	subtasks: [String]
}, { collection: "taskDB" });

module.exports = mongoose.model("Task", taskSchema);
