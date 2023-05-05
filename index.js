const express = require("express");
const cors = require("cors");
const { connection } = require("./database");
const userRouter = require("./routes/userRouter");
const loggerMiddleware = require("./middlewares/loggerMiddleware");

const port = 5000;

const app = express();

app.use(express.json());
app.use(cors());
app.use("/users", loggerMiddleware, userRouter);

app.get("/", (req, res) => {
	res.status(200).send({ message: "Home" });
});

connectThenListen();

async function connectThenListen() {
	try {
		await connection;
		console.log("The app is successfully to connected with MongoDB");
		await app.listen(port);
		console.log("The app is listening at", `http://localhost:${port}`);
	} catch (error) {
		console.log({ error: error.message });
	}
}
