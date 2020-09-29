<script>
	import Table from "sveltestrap/src/Table.svelte";
	import Button from "sveltestrap/src/Button.svelte";

	let ecstats = [];
	let newECStat = {
		year: "",
		ecu: "",
		rpc: "",
		cdepc: ""
	};

	let searchECStat = {
		country: "",
		year: "",
		ecu: "",
		rpc: "",
		cdepc: ""
	};

	let page = 1;
	const statsPerPage = 2;
	let ecstatsLen = 0;
	let lastPage = false;

	let statusMessage = "";

	//onMount(getContacts);

	async function getECStats(){
		console.log("Fetching Stats...");

		let searches = "";

		if(searchECStat.country != ""){
			searches = searches + "country=" + searchECStat.country + "&";
		}

		if(searchECStat.year != ""){
			searches = searches + "year=" + searchECStat.year + "&";
		}

		if(searchECStat.ecu != ""){
			searches = searches + "ecu=" + searchECStat.ecu + "&";
		}

		if(searchECStat.rpc != ""){
			searches = searches + "rpc=" + searchECStat.rpc + "&";
		}

		if(searchECStat.cdepc != ""){
			searches = searches + "cdepc=" + searchECStat.cdepc + "&";
		}

		const res = await fetch("/api/v1/ec-stats?" + searches + "limit=" + statsPerPage
			+  "&offset=" + statsPerPage*(page-1));

		if (res.ok){
			console.log("Ok");
			const json = await res.json();
			ecstats = json;
			ecstatsLen = ecstats.length;
			lastPage = ecstats[ecstatsLen - 1] == null;
			console.log("Stats Received: " + ecstatsLen); 
		} else {
			console.log("ERROR");
		}
	} 

	async function insertECStat(){
		console.log("Inserting ECStat...");
		const res = await fetch("/api/v1/ec-stats", {
			method: "POST",
			body: JSON.stringify(newECStat),
				headers:{
					"Content-Type": "application/json"
				}
		}).then(function(res) {
			getECStats();
			statusMessage = "New data inserted: Country " + newECStat.country + " and year " + newECStat.year;
		});

	}

	console.log("Calling getECStats");
	getECStats();
	console.log("After Calling getECStats");

	async function deleteECStat(country, year){
		console.log("Deleting ECStat...");
		const res = await fetch("/api/v1/ec-stats/" + country + "/" + year, {
			method: "DELETE"
		}).then(function(res) {
			statusMessage = "Data of country " + country + " and year " + year + " deleted succesfully";
			getECStats();
		});
	}

	async function deleteAllECStats(){
		console.log("Deleting All ECStats...");
		const res = await fetch("/api/v1/ec-stats/", {
			method: "DELETE"
		}).then(function(res) {
			statusMessage = "All data deleted succesfully";
			getECStats();
		});
	}

	async function loadInitialData(){
		console.log("Loading Initial Data...");
		const res = await fetch("/api/v1/ec-stats/loadInitialData", {
			method: "GET"
		}).then(function(res) {
			statusMessage = "Initial data of EC-Stats loaded succesfully";
			getECStats();
		});
	}

	async function nextPage(){
		page = page + 1;
		console.log("Loading next page...");
		getECStats();
	}

	async function previousPage(){
		page = page - 1;
		console.log("Loading next page...");
		getECStats();
	}

</script>

<main>
	<h4>Page {page}</h4>
	<p style="color: green"><strong>{statusMessage}</strong></p>
	<Table bordered>
		<thead>
			<tr>
				<!-- <td>ID</td> -->
				<th>Country</th>
				<th>Year</th>
				<th>Electric Cars Use</th>
				<th>Rent Per Capita</th>
				<th>CO2 Emisions Per Capita</th>
				<th>Actions</th>
			</tr>
		</thead>
	<tbody>
		<tr>
			<!-- <td>{contact._id}</td> -->
			<td><input bind:value="{searchECStat.country}"></td>
			<td><input bind:value="{searchECStat.year}"></td>
			<td><input bind:value="{searchECStat.ecu}"></td>
			<td><input bind:value="{searchECStat.rpc}"></td>
			<td><input bind:value="{searchECStat.cdepc}"></td>
			<td><Button outline color="info" on:click={getECStats}>Search</Button></td>
		</tr>

		<tr>
			<!-- <td>{contact._id}</td> -->
			<td><input bind:value="{newECStat.country}"></td>
			<td><input bind:value="{newECStat.year}"></td>
			<td><input bind:value="{newECStat.ecu}"></td>
			<td><input bind:value="{newECStat.rpc}"></td>
			<td><input bind:value="{newECStat.cdepc}"></td>
			<td><Button outline color="primary" on:click={insertECStat}>Insert</Button></td>
		</tr>

		{#each ecstats as ecstat}
		{#if ecstat != null}
		<tr>
			<!-- <td>{contact._id}</td> -->
			<td><a href="#/ec-stat/{ecstat.country}/{ecstat.year}">{ecstat.country}</a></td>
			<td>{ecstat.year}</td>
			<td>{ecstat.ecu}</td>
			<td>{ecstat.rpc}</td>
			<td>{ecstat.cdepc}</td>
			<td><Button outline color="danger" on:click="{deleteECStat(ecstat.country, ecstat.year)}">Delete</Button></td>
		</tr>
		{/if}
		{/each}
	</tbody>
	</Table>
	<div>
		<Button outline color="danger" on:click="{deleteAllECStats}">Delete All Data</Button>
		<Button outline color="success" on:click="{loadInitialData}">Load Initial Data</Button>
		{#if page > 1}
		<Button outline on:click="{previousPage}">Previuos Page</Button>
		{/if}
		{#if !lastPage}
		<Button outline on:click="{nextPage}">Next Page</Button>
		{/if}
	</div>
</main>