const express = require("express");
const UserModel = require("../models/UserModel");

function randomID() {
	return Math.random().toString();
}

let users = [
	{ id: randomID(), name: "Tom" },
	{ id: randomID(), name: "Jerry" }
];

let userRouter = express.Router();

userRouter.get("/", async (req, res) => {
	const users = await UserModel.find({});
	res.status(200).send(users);
});

userRouter.post("/", async (req, res) => {
	try {
		const user = req.body;
		const userDoc = await UserModel(user);
		await userDoc.save();
		res.status(201).send(userDoc);
	} catch (error) {
		res.status(500).send({ error: error.message });
	}
});

userRouter.put("/:_id", async (req, res) => {
	try {
		const { _id } = req.params;
		const user = req.body;
		const userDoc = await UserModel.findOneAndReplace({ _id }, user, {
			returnDocument: "after"
		});
		res.status(201).send(userDoc);
	} catch (error) {
		res.status(500).send({ error: error.message });
	}
});

userRouter.patch("/:_id", async (req, res) => {
	try {
		const { _id } = req.params;
		const user = req.body;
		const userDoc = await UserModel.findOneAndUpdate({ _id }, user, {
			returnDocument: "after"
		});
		res.status(201).send(userDoc);
	} catch (error) {
		res.status(500).send({ error: error.message });
	}
});

userRouter.delete("/:_id", async (req, res) => {
	try {
		const { _id } = req.params;
		const userDoc = await UserModel.findOneAndDelete({ _id });
		res.send(userDoc);
	} catch (error) {
		res.status(500).send({ error: error.message });
	}
});

module.exports = userRouter;
