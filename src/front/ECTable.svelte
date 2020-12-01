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
	let errorMessage = "";

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
			if(res.status == 201){
				statusMessage = "Nuevo dato insertado: País " + newECStat.country + " y año " + newECStat.year;
			}else if(res.status == 400){
				statusMessage = "No se puede insertar el dato, el país y año ya existen";
			}
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
			statusMessage = "Datos del país " + country + " y año " + year + " borrados con éxito";
			getECStats();
		});
	}

	async function deleteAllECStats(){
		console.log("Deleting All ECStats...");
		const res = await fetch("/api/v1/ec-stats/", {
			method: "DELETE"
		}).then(function(res) {
			statusMessage = "Todos los datos borrados con éxito";
			getECStats();
		});
	}

	async function loadInitialData(){
		console.log("Loading Initial Data...");
		const res = await fetch("/api/v1/ec-stats/loadInitialData", {
			method: "GET"
		}).then(function(res) {
			statusMessage = "Datos iniciales cargados correctamente";
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
	{#if statusMessage.startsWith("No se puede")}
		<p style="color: red"><strong>{statusMessage}</strong></p>
	{:else}
		<p style="color: green"><strong>{statusMessage}</strong></p>
	{/if}	
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
			<td><input bind:value="{searchECStat.country}"></td>
			<td><input bind:value="{searchECStat.year}"></td>
			<td><input bind:value="{searchECStat.ecu}"></td>
			<td><input bind:value="{searchECStat.rpc}"></td>
			<td><input bind:value="{searchECStat.cdepc}"></td>
			<td><Button outline color="info" on:click={getECStats}>Buscar</Button></td>
		</tr>

		<tr>
			<!-- <td>{contact._id}</td> -->
			<td><input bind:value="{newECStat.country}"></td>
			<td><input bind:value="{newECStat.year}"></td>
			<td><input bind:value="{newECStat.ecu}"></td>
			<td><input bind:value="{newECStat.rpc}"></td>
			<td><input bind:value="{newECStat.cdepc}"></td>
			<td><Button outline color="primary" on:click={insertECStat}>Insertar</Button></td>
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
			<td><Button outline color="danger" on:click="{deleteECStat(ecstat.country, ecstat.year)}">Eliminar</Button></td>
		</tr>
		{/if}
		{/each}
	</tbody>
	</Table>
	<div class="botonesTabla">
		<Button outline color="danger" on:click="{deleteAllECStats}">Borrar todos los datos</Button>
		<Button outline color="success" on:click="{loadInitialData}">Cargar datos iniciales</Button>
		{#if page > 1}
		<Button outline on:click="{previousPage}">Página anterior</Button>
		{/if}
		{#if !lastPage}
		<Button outline on:click="{nextPage}">Página siguiente</Button>
		{/if}
	</div>
	<p class="numpag">Página {page}</p>
	<form class="botonAtrasTabla" method="get" action="/">
        <button type="submit">Atrás</button>
  	</form>
</main>

<style>
	.numpag{
		float: right;
	}

	.botonesTabla{
		float: left;
	}

	.botonAtrasTabla{
		padding-top: 10px;
		clear: both;
	}
</style>