const fs = require("fs");

function loggerMiddleware(req, res, next) {
	const file = "logs.txt";
	const log = `${req.method} ${Date()}\n`;
	fs.appendFileSync(file, log);
	next();
}

module.exports = loggerMiddleware;
