<script>
	import Router from 'svelte-spa-router';
	import NotFound from './NotFound.svelte';

	import ECTable from './ECTable.svelte';
	import EditECStat from './EditECStat.svelte';

	import MyGraph from "./MyGraph.svelte";
	import MyGraph2 from './MyGraph2.svelte'

	const routes = {
		"/" : ECTable,
		"/ec-stat/:ECStatCountry/:ECStatYear": EditECStat,
		"/graph": MyGraph,
		"/graph2": MyGraph2,
		"*": NotFound
	}
</script>

<main>
	<h1>EC-Stats Manager</h1>
	 <Router {routes} />
	<!-- <ContactsTable /> -->
</main>

<!--
<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
-->