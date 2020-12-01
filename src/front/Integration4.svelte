<script>
  import bb from "billboard.js/dist/billboard.pkgd";

  let ecstats = [];
  let gcstats = [];

  async function loadGraph(){

const resECStats = await fetch("/api/v1/ec-stats");
const resGCFStats = await fetch("/api/v3/global-coef");

ecstats = await resECStats.json();
gcstats = await resGCFStats.json();

var MyData1 = ["Renta per cápita de su país"];
var MyData2 = ["Puntación UEFA"];
var Countries = [];

ecstats.forEach(ecstat => {
        gcstats.forEach(gcstat => {
            if(ecstat.country.toLowerCase() == gcstat.country){
                MyData1.push(ecstat.rpc);
                MyData2.push(gcstat.coefficient);
                Countries.push(gcstat.team + " (" + gcstat.country + ")");
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
  <h2>Puntos UEFA por equipo y la renta per cápita de su país</h2>
      <div id="barChart"></div>
      <p>
        Integración con el grupo 26. Comparación entre la renta per cápita de los países y el coeficiente en la UEFA de sus equipos de fútbol.
      </p>
      <form method="get" action="/#/integrations">
        <button type="submit">Atrás</button>
    </form>
</main>