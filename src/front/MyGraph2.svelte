<script>
  import bb from "billboard.js/dist/billboard.pkgd";

  let ecstats = [];

  async function loadGraph(){

const resECStats = await fetch("/api/v1/ec-stats");
ecstats = await resECStats.json();
var MyData = ["Electric Cars Use (%)"];
let countries = [];

ecstats.forEach(ecstat => {
        MyData.push(ecstat.ecu);
        countries.push(ecstat.country + " " + ecstat.year);
    });

    var chart = bb.generate({
data: {
  columns: [
    MyData
  ],
  type: "bar", // for ESM specify as: bar()
},
bar: {
  width: {
    ratio: 0.5
  }
},
axis: {
    x: {
      type: "category",
      categories: countries
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
  <h2>Electric cars use per country</h2>
      <div id="barChart"></div>
</main>