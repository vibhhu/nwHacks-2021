const express = require("express");
const { translateAliases } = require("../models/task");
const router = express.Router();
const Task = require("../models/task");

/*
 *	Helper function to get a task by id
 */
async function getTask(req, res, next) {
    let task;
    await Task.findOne({ "id": req.params.taskid}, function (err, foundtask) {
        if (err) return res.status(404).send(err.message);
        task = foundtask;
    });
	res.task = task;
	next();
}

/*
 *	GET request for a specific task.
 */
router.get("/:taskid", getTask, (req, res) => {
	res.json(res.task);
});

/*
 *	DELETE request for a specific task.
 */
router.delete("/:taskid", async (req, res) => {
	Task.deleteOne({ id: req.params.taskid}).then(function(){
        res.status(200).send("Successfully deleted task");
    }).catch(function(error) {
        res.status(400).send(err.message);
    })
});

/*
 *	POST new task
 */
router.post("/", async (req, res) => {
	try {
		let task = new Task();
        
        task.id = req.body.id;
        task.latestChangeTime = 0;
        task.totalActualTime = 0;
        task.status = false;
		if (req.body.title != null) {
			task.title = req.body.title;
		}
		if (req.body.totalEstimatedTime != null) {
			task.totalEstimatedTime = req.body.totalEstimatedTime;
        }
        if (req.body.priority != null) {
            task.priority = req.body.priority;
        }
        if (req.body.subtasks != null) {
            task.subtasks = req.body.subtasks;
        }
		await task.save();
		res.status(200).send("Successfully created task.");
	} catch (err) {
		res.status(400).send(err.message);
	}
});

/*
 *	UPDATE request on task
 */
router.put("/:taskid", async (req, res) => {
	try {
        let task
        await Task.findOne({ "id": req.params.taskid}, function (err, foundtask) {
            if (err) return res.status(404).send(err.message);
            task = foundtask;
        });
        
        if (req.body.title != null) {
			task.title = req.body.title;
		}
		if (req.body.totalEstimatedTime != null) {
			task.totalEstimatedTime = req.body.totalEstimatedTime;
        }
        if (req.body.priority != null) {
            task.priority = req.body.priority;
        }
        if (req.body.subtasks != null) {
            task.subtasks = req.body.subtasks;
        }
		await task.save();
		res.status(200).send("Successfully updated task details");
	} catch (err) {
		res.status(400).send(err.message);
	}
});

/*
 *	GET request to start working on a task
 *
router.get("/:taskid/start", async (req, res) => {
	try {
        let task
        await Task.findOne({ "id": req.params.taskid}, function (err, foundtask) {
            if (err) return res.status(404).send(err.message);
            task = foundtask;
        });
        
        task.status = true;
		task.latestChangeTime = Math.floor(new Date() / 1000);
		await task.save();
		res.status(200).send("Successfully started task");
	} catch (err) {
		res.status(400).send(err.message);
	}
});*/

/*
 *	GET request to stop working on a task
 *
router.post("/:taskid/stop", async (req, res) => {
	try {
        let task
        await Task.findOne({ "id": req.params.taskid}, function (err, foundtask) {
            if (err) return res.status(404).send(err.message);
            task = foundtask;
        });
        
        task.status = false;
        var timeDifference = task.latestChangeTime -  Math.floor(new Date() / 1000);
        task.totalActualTime += timeDifference;
        if (task.productivityScore != null) {
            task.productivityScore += (timeDifference / task.totalEstimatedTime) * req.body.productivityScore;
        } else {
            task.productivityScore
        }
        task.productivityScore += (timeDifference / task.totalEstimatedTime) * req.body.productivityScore;
        if (task.totalActualTime > task.totalEstimatedTime) {
            task.productivityScore -= (timeDifference * 2 * (120 - productivityScore)) / task.totalEstimatedTime;
        }

        if (task.productivityScore > 100) {
            task.productivityScore = 100;
        } else if (task.productivityScore < 0) {
            task.productivityScore = 0;
        }
		await task.save();
		res.status(200).send("Successfully stopped task");
	} catch (err) {
		res.status(400).send(err.message);
	}
});*/


module.exports = router;
