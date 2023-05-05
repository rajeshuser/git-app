const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	id: String,
	__v: Number,
	name: String
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
