module.exports = function(app, db2) {
	console.log('Registering EC API');

	const request = require('request');

	var initialData = [
		{
			country: 'United_States',
			year: 2015,
			ecu: 0.66,
			rpc: 59.532,
			cdepc: 14.65
		},
		{
			country: 'China',
			year: 2015,
			ecu: 0.84,
			rpc: 9.608,
			cdepc: 6.51
		},
		{
			country: 'France',
			year: 2015,
			ecu: 1.2,
			rpc: 48.640,
			cdepc: 4.72
		},
		{
			country: 'Germany',
			year: 2015,
			ecu: 0.3,
			rpc: 55.306,
			cdepc: 8.7
		},
		{
			country: 'Canada',
			year: 2015,
			ecu: 0.35,
			rpc: 46.260,
			cdepc: 14.91
		}
	];

	const BASE_API_URL = '/api/v1';

	//INTEGRACIONES
		//API de Fernando: Integracion1
	app.use("/api/v1/cbp", function (req, res) {
		var url = "http://sos1920-sep-fco.herokuapp.com" + req.baseUrl + req.url;
		console.log("Get Api Externa");
		console.log("URL Api Externa: " + url);
		console.log('piped: ' + req.baseUrl + req.url);
		req.pipe(request(url)).pipe(res);
	});

		//API de Ruben: Integracion2
	app.use("/api/v1/mercados", function (req, res) {
		var url = "https://sos1920-sep-rnl.herokuapp.com" + req.baseUrl + req.url;
		console.log("Get Api Externa");
		console.log("URL Api Externa: " + url);
		console.log('piped: ' + req.baseUrl + req.url);
		req.pipe(request(url)).pipe(res);
	});

			//API de Ruben: Integracion2
	app.use("/api/v1/mercados", function (req, res) {
		var url = "https://sos1920-sep-rnl.herokuapp.com" + req.baseUrl + req.url;
		console.log("Get Api Externa");
		console.log("URL Api Externa: " + url);
		console.log('piped: ' + req.baseUrl + req.url);
		req.pipe(request(url)).pipe(res);
	});

		//API Countries REST: Integracion Externa 1
	app.use("/rest/v2/all", function (req, res) {
		var url = "https://restcountries.eu" + req.baseUrl + req.url;
		console.log("Get Api Externa");
		console.log("URL Api Externa: " + url);
		console.log('piped: ' + req.baseUrl + req.url);
		req.pipe(request(url)).pipe(res);
	});

		//API Countries REST: Integracion Externa 2
	app.use("/v2/countries", function (req, res) {
		var url = "https://corona.lmao.ninja" + req.baseUrl + req.url;
		console.log("Get Api Externa");
		console.log("URL Api Externa: " + url);
		console.log('piped: ' + req.baseUrl + req.url);
		req.pipe(request(url)).pipe(res);
	});

	function checkJSON(data) {
		return (
			data.country != null &&
			data.year != null &&
			data.ecu != null &&
			data.rpc != null &&
			data.cdepc != null
		);
	}

	app.post(BASE_API_URL + '/ec-stats', (req, res) => {
		console.log("Llamando a post");
		console.log(req.body);

		var country = req.body.country;
		var year = req.body.year;

		db2.find({}, (err, rows) => {
			var frows = rows.filter(r => {
				return r.country == country && r.year == year;
			});

			if (frows.length >= 1) {
				res.sendStatus(400, 'BAD REQUEST: Already exists');
			} else {
				if (checkJSON(req.body)) {
					db2.insert(req.body);
					res.sendStatus(201, 'CREATED');
				} else {
					res.sendStatus(400, 'BAD REQUEST: Format not allowed');
				}
			}
		});

	});

	app.get(BASE_API_URL + '/ec-stats', (req, res) => {
		var rlimit = req.query.limit;
		var roffset = req.query.offset;
		var rcountry = req.query.country;
		var ryear = req.query.year;
		var recu = req.query.ecu;
		var rrpc = req.query.rpc;
		var rcdepc = req.query.cdepc;

		db2.find({}, (err, row) => {
			row.forEach(r => {
				delete r._id;
			});

			var frows = row;

			if (rcountry != undefined) {
				frows = frows.filter(r => {
					return r.country == rcountry;
				});
			}

			if (ryear != undefined) {
				frows = frows.filter(r => {
					return r.year == ryear;
				});
			}

			if (recu != undefined) {
				frows = frows.filter(r => {
					return r.ecu == recu;
				});
			}

			if (rrpc != undefined) {
				frows = frows.filter(r => {
					return r.rpc == rrpc;
				});
			}

			if (rcdepc != undefined) {
				frows = frows.filter(r => {
					return r.cdepc == rcdepc;
				});
			}

			if (roffset != undefined) {
				var newFrows = [];

				for (i = roffset; i < frows.length; i++) {
					newFrows.push(frows[i]);
				}

				frows = newFrows;
			}

			if (rlimit != undefined) {
				var newFrows = [];

				for (i = 0; i < rlimit; i++) {
					newFrows.push(frows[i]);
				}

				frows = newFrows;
			}

			res.send(JSON.stringify(frows, null, 2));
			//console.log('Data is' + JSON.stringify(frows, null, 2));
			//console.log(rcountry);
		});
	});

	app.delete(BASE_API_URL + '/ec-stats/:country/:year', (req, res) => {
		var country = req.params.country;
		var year = req.params.year;

		db2.find({}, (err, rows) => {
			var frows = rows.filter(r => {
				return r.country == country && r.year == year;
			});

			if (frows.length >= 1) {
				var idr = frows[0]._id;
				db2.remove({ _id: idr }, {}, function(err, numRemoved) {});
				res.sendStatus(200, 'REMOVED');
			} else {
				res.sendStatus(404, 'ROW NOT FOUND');
			}
		});
	});

	app.put(BASE_API_URL + '/ec-stats/:country/:year', (req, res) => {
		if (checkJSON(req.body)) {
			var country = req.params.country;
			var year = req.params.year;

			db2.find({}, (err, rows) => {
				var frows = rows.filter(r => {
					return r.country == country && r.year == year;
				});

				if (frows.length >= 1) {
					var idr = frows[0]._id;
					db2.remove({ _id: idr }, {}, function(err, numRemoved) {});
					db2.insert(req.body);
					res.sendStatus(200, 'UPDATED');
				} else {
					res.sendStatus(404, 'ROW NOT FOUND');
				}
			});
		} else {
			res.sendStatus(400, 'BAD REQUEST');
		}
	});

	app.get(BASE_API_URL + '/ec-stats/loadInitialData', (req, res) => {
		console.log('Now get loadInitialData');

		db2.remove({}, { multi: true }, function(err, numRemoved) {});

		db2.insert(initialData);
		res.sendStatus(200);
		console.log('Initial Contacts Loaded' + JSON.stringify(initialData, null, 2));
	});

	app.get(BASE_API_URL + '/ec-stats/:country/:year', (req, res) => {
		var country = req.params.country;
		var year = req.params.year;

		db2.find({}, (err, rows) => {
			rows.forEach(r => {
				delete r._id;
			});

			var frows = rows.filter(r => {
				return r.country == country && r.year == year;
			});

			if (frows.length >= 1) {
				res.send(frows[0]);
			} else {
				res.sendStatus(404, 'ROW NOT FOUND');
			}
		});
	});

	//PARTES DE LA V2
	app.get(BASE_API_URL + '/ec-stats/deleteAllData', (req, res) => {
		console.log('Removing all data');
		db2.remove({}, { multi: true }, function(err, numRemoved) {});
		res.sendStatus(200);
		console.log('All Data Removed');
	});

	app.delete(BASE_API_URL + '/ec-stats/', (req, res) => {
		console.log('Removing all data');
		db2.remove({}, { multi: true }, function(err, numRemoved) {});
		res.sendStatus(200);
		console.log('All Data Removed');
	});

};