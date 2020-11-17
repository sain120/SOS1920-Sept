<script>
	import Router from 'svelte-spa-router';
	import NotFound from './NotFound.svelte';

	import Home from './Home.svelte';
	import ECTable from './ECTable.svelte';
	import EditECStat from './EditECStat.svelte';
	

	import MyGraph from "./MyGraph.svelte";
	import MyGraph2 from './MyGraph2.svelte';
	import MyGraph3 from './MyGraph3.svelte'
	import Integration from './Integration.svelte';
	import Integration2 from './Integration2.svelte';
	import ExtIntegration from './ExtIntegration.svelte';
	import ExtIntegration2 from './ExtIntegration2.svelte';
	import MenuIntegration from './MenuIntegration.svelte';

	import About from './About.svelte';


	const routes = {
		"/" : Home,
		"/table": ECTable,
		"/ec-stat/:ECStatCountry/:ECStatYear": EditECStat,
		"/graph": MyGraph,
		"/graph2": MyGraph2,
		"/analytics": MyGraph3,
		"/integration": Integration,
		"/integration2": Integration2,
		"/extintegration": ExtIntegration,
		"/extintegration2": ExtIntegration2,
		"/integrations": MenuIntegration,
		"/about": About,
		"*": NotFound
	}
	
</script>

<main>
	<h1 class="titulo2"><a href="/">Coches Eléctricos</a></h1>
	 <Router {routes} />
</main>

<style>
	.titulo2{
		text-align: center;
		background-color: lightskyblue;
		padding-top: 5px;
		padding-bottom: 5px;
	}

	a:link, a:visited, a:active, a:hover {
    text-decoration:none;
	color: #141414;
	}

</style>