const express = require("express");
const bodyParser = require("body-parser");
const dataStore = require("nedb");
const path = require("path");
const ecAPI = require(path.join(__dirname, "ecAPI"));
const { response } = require("express");

var port = process.env.PORT || 12345;
const dbFileName2 = path.join(__dirname, "ec-stats.db");

const app = express();

app.use(bodyParser.json());
app.use("/", express.static("./public"));

const db2 = new dataStore({
		filename: dbFileName2,
		autoload: true
});

ecAPI(app,db2);

app.listen(port, () => {
	console.log("Server ready on port " +port);
});

console.log("Starting server...");