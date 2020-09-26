<script>
	import Table from "sveltestrap/src/Table.svelte";
	import Button from "sveltestrap/src/Button.svelte";

	let ecstats = [];
	let newECStat = {
		country: "",
		year: "",
		ecu: "",
		rpc: "",
		cdepc: ""
	};

	//onMount(getContacts);

	async function getECStats(){
		console.log("Fetching Stats...");
		const res = await fetch("/api/v1/ec-stats");

		if (res.ok){
			console.log("Ok");
			const json = await res.json();
			ecstats = json;
			console.log("Stats Received: " +ecstats.length); 
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
			getECStats();
		});
	}

	async function deleteAllECStats(){
		console.log("Deleting All ECStats...");
		const res = await fetch("/api/v1/ec-stats/", {
			method: "DELETE"
		}).then(function(res) {
			getECStats();
		});
	}

</script>

<main>
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
			<td><input bind:value="{newECStat.country}"></td>
			<td><input bind:value="{newECStat.year}"></td>
			<td><input bind:value="{newECStat.ecu}"></td>
			<td><input bind:value="{newECStat.rpc}"></td>
			<td><input bind:value="{newECStat.cdepc}"></td>
			<td><Button outline color="primary" on:click={insertECStat}>Insert</Button></td>
		</tr>

		{#each ecstats as ecstat}
		<tr>
			<!-- <td>{contact._id}</td> -->
			<td><a href="#/ec-stat/{ecstat.country}/{ecstat.year}">{ecstat.country}</a></td>
			<td>{ecstat.year}</td>
			<td>{ecstat.ecu}</td>
			<td>{ecstat.rpc}</td>
			<td>{ecstat.cdepc}</td>
			<td><Button outline color="danger" on:click="{deleteECStat(ecstat.country, ecstat.year)}">Delete</Button></td>
		</tr>
		{/each}
	</tbody>
	</Table>
	<div>
		<!-- <Button outline color="danger" on:click="{deleteAllECStats()}">Delete All Data</Button> -->
	</div>
</main>