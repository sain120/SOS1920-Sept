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
	let errorMessageFromCode = "";
	let statusMessage = "";

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
		if(res.status == 404){
			errorMessageFromCode = "No hay datos con país " +  params.ECStatCountry + " y año " + params.ECStatYear;
		}
		errorMessage = "Error " + res.status + " (" + res.statusText + "): " + errorMessageFromCode;
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
			//window.location.replace("/");
			statusMessage = "Datos actualizados con éxito"
		});
	}

console.log("Loading Stat...");
getECStat();

</script>


<main>
		{#await ecstat}
        Cargando ecstat...
		{:then ecstat}

		{#if errorMessage}
		<p style="color: red"><strong>{errorMessage}</strong></p>
		{:else}
		Editar Dato <strong>País: {params.ECStatCountry}, Año: {params.ECStatYear}</strong>
		<p style="color: green"><strong>{statusMessage}</strong></p>
		<Table bordered>
			<thead>
				<tr>
					<!-- <td>ID</td> -->
					<th>País</th>
					<th>Año</th>
					<th>Uso de coches eléctricos</th>
					<th>Renta per cápita</th>
					<th>Emisiones CO2 per cápita</th>
					<th>Acciones</th>
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
					<td><Button outline color="primary" on:click={updateECStat}>Actualizar</Button></td>
				</tr>
			</tbody>
		</Table>
		{/if}
		{/await}

		<form method="get" action="/#/table">
			<button type="submit">Atrás</button>
		</form>
</main>