const express = require("express");
const router = express.Router();
const User = require("../models/user");
/*
 *	Middleware function to send in the userid to child routers.
 */
function sendUserId(req, res, next) {
	req.userid = req.params.userid;
	next();
}

/*
 *	Helper function to get a user by userid.
 */
async function getUser(req, res, next) {
	let user;
	try {
		user = await User.findById(req.params.userid);
	} catch (err) {
		return res.status(404).send(err.message);
	}
	res.user = user;
	next();
}

/*
 *	GET request for a specific user.
 */
router.get("/:userid", getUser, (req, res) => {
	res.json(res.user);
});

/*
 *	DELETE request for a specific user.
 */
router.delete("/:userid", async (req, res) => {
	User.deleteOne({ _id: req.params.userid}).then(function(){
        res.status(200).send("Successfully deleted user");
    }).catch(function(error) {
        res.status(400).send(err.message);
    })
});

/*
 *	POST new user
 */
router.post("/", async (req, res) => {
	try {
		let user = new User();
        
        if (req.body.firstname != null) {
            user.firstname = req.body.firstname;
        }
		if (req.body.lastname != null) {
			user.lastname = req.body.lastname;
		}
		if (req.body.email != null) {
			user.email = req.body.email;
        }
        if (req.body.tasks != null) {
            user.tasks = req.body.tasks;
        }
		await user.save();
		res.status(200).send("Successfully updated user details");
	} catch (err) {
		res.status(400).send(err.message);
	}
});

/*
 *	UPDATE request on fields of user
 */
router.put("/:userid", async (req, res) => {
	try {
		let user = await User.findById(req.params.userid);
        
        if (req.body.firstname != null) {
            user.firstname = req.body.firstname;
        }
		if (req.body.lastname != null) {
			user.lastname = req.body.lastname;
		}
		if (req.body.email != null) {
			user.email = req.body.email;
        }
		await user.save();
		res.status(200).send("Successfully updated user details");
	} catch (err) {
		res.status(400).send(err.message);
	}
});

/*
 *	POST request on tasks field of user
 */
router.post("/:userid/tasks", async(req, res) => {
    try {
		let user = await User.findById(req.params.userid);
        
        if (req.body.task != null) {
            user.tasks.push(req.body.task);
        }
		await user.save();
		res.status(200).send("Successfully added task");
	} catch (err) {
		res.status(400).send(err.message);
	}
})

/*
 *	DELETE request for a specific task
 */
router.delete("/:userid/tasks", async (req, res) => {
    try {
        let user = await User.findById(req.params.userid);
        if (req.body.task != null) {
            user.tasks = user.tasks.filter(task => task !== req.body.task)
        }
        await user.save();
		res.status(200).send("Successfully deleted task");
    } catch (err) {
        res.status(400).send(err.message);
    }
	
});

module.exports = router;
