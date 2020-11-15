<script>
  import bb from "billboard.js/dist/billboard.pkgd";

  let ecstats = [];
  let costats = [];

  async function loadGraph(){

const resECStats = await fetch("/api/v1/ec-stats");
const resCOUStats = await fetch("/rest/v2/all");

ecstats = await resECStats.json();
costats = await resCOUStats.json();

var MyData1 = ["Electric_Cars_Use"];
var MyData2 = ["Area"];
var Countries = [];

ecstats.forEach(ecstat => {
        costats.forEach(costat => {
            if(ecstat.country == costat.name || ecstat.country == "United_States" && costat.name == "United States of America"){
                MyData1.push(ecstat.ecu);
                MyData2.push(costat.area);
                Countries.push(ecstat.country);
            }
        });
    });

var chart = bb.generate({
  data: {
    columns: [
  MyData1,
  MyData2
    ],
    type: "bar",
    axes: {
      Electric_Cars_Use: "y",
      Area: "y2"
    }
  },
  axis: {
    x: {
      type: "category",
      categories: Countries
    },
    y2: {
      show: true
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
  <h2>Uso de coches eléctricos y tamaño de los paises</h2>
      <div id="barChart"></div>
      <p>
        Integración externa con la API "REST Countries". Relación entre el uso de coches eléctricos y el tamaño del país.
      </p>
      <form method="get" action="/#/integrations">
        <button type="submit">Atrás</button>
    </form>
</main>