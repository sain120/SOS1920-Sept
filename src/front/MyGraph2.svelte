<script>

  import Button from "sveltestrap/src/Button.svelte";
  import  {pop} from "svelte-spa-router";
  import bb from "billboard.js/dist/billboard.pkgd";

  const URL_BASE = "api/v1/mercados";
  
  async function loadGraph(){
    var chart = bb.generate({
data: {
  columns: [
["data1", 30, 200, 100, 400, 150, 250],
["data2", 130, 100, 140, 200, 150, 50]
  ],
  type: "bar", // for ESM specify as: bar()
},
bar: {
  width: {
    ratio: 0.5
  }
},
bindto: "#barChart"
});

  }

  loadGraph();

</script>

<head>

  <script src="https://d3js.org/d3.v5.min.js"></script>
  <script src="libraries/billboard.js"></script>
  <link rel="stylesheet" href="css/billboard.css">
  
</head>

<main>
  <h2>Gráfica 2</h2>
      <div id="barChart"></div>
</main>