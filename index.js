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

app.get("/data", (req, res) => {
    var data =
	[{
        name: 'EEUU',
        color: 'rgba(223, 83, 83, .5)',
        data: [[0.66, 14.65]]
	},
	{
        name: 'China',
        color: 'rgba(223, 83, 83, .5)',
        data: [[0.84, 6.51]]
	},
	{
        name: 'France',
        color: 'rgba(223, 83, 83, .5)',
        data: [[1.2, 4.72]]
    }];
    res.send(data)
});

const db2 = new dataStore({
		filename: dbFileName2,
		autoload: true
});

ecAPI(app,db2);

app.listen(port, () => {
	console.log("Server ready on port " +port);
});

console.log("Starting server...");