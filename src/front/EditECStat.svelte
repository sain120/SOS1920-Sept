<script>
	import Table from "sveltestrap/src/Table.svelte";   
	import Button from "sveltestrap/src/Button.svelte";

	export let params = {};	

	let ecstat = {};

	let updatedCountry = "Country";
	let updatedYear = "2000";
	let updatedEcu = "0.17";
	let updatedRpc = "1300";
	let updatedCdepc = "15.1";

	let errorMessage

async function getECStat(){
	console.log("Fetching ECStat...");
	const res = await fetch("/api/v1/ec-stats/" + params.ECStatCountry + "/" + params.ECStatYear);

	if (res.ok){
		console.log("Ok");
		const json = await res.json();
		ecstat = json;

		updatedCountry = ecstat.country;
		updatedYear = ecstat.year;
		updatedEcu = ecstat.ecu;
		updatedRpc = ecstat.rpc;
		updatedCdepc = ecstat.cdepc;

		console.log("Received ECStat"); 
	} else {
		errorMessage = res.status + ":" + res.statusText;
		console.log("ERROR");
	}
} 

async function updateECStat(){
		console.log("Updating ECStat...");
		const res = await fetch("/api/v1/ec-stats/"  + params.ECStatCountry + "/" + params.ECStatYear, {
			method: "PUT",
			body: JSON.stringify(
				{
					country:updatedCountry,
					year:updatedYear,
					ecu:updatedEcu,
					rpc:updatedRpc,
					cdepc:updatedCdepc,
					_id:ecstat._id
				}
			),
				headers:{
					"Content-Type": "application/json"
				}
		}).then(function(res) {
			window.location.replace("/");
		});
	}

console.log("Loading Stat...");
getECStat();

</script>


<main>

		Edit ECStat <strong>Country: {params.ECStatCountry}, Year: {params.ECStatYear}</strong>
		
		{#await ecstat}
        Loading ecstat...
		{:then ecstat}

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
					<td><input bind:value="{updatedCountry}"></td>
					<td><input bind:value="{updatedYear}"></td>
					<td><input bind:value="{updatedEcu}"></td>
					<td><input bind:value="{updatedRpc}"></td>
					<td><input bind:value="{updatedCdepc}"></td>
					<td><Button outline color="primary" on:click={updateECStat}>Update</Button></td>
				</tr>
			</tbody>
		</Table>
		{/await}
    
		{#if errorMessage}
		<p style="color: red">Error: {errorMessage}</p>
		{/if}
</main>