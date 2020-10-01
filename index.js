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
        name: 'Female',
        color: 'rgba(223, 83, 83, .5)',
        data: [[183.2, 51.6], [167.5, 59.0], [159.5, 49.2]]

    }, {
        name: 'Male',
        color: 'rgba(119, 152, 191, .5)',
        data: [[174.0, 65.6], [175.3, 71.8], [193.5, 80.7]]
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