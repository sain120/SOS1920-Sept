<script>
  import bb from "billboard.js/dist/billboard.pkgd";
  ///import bb, {bubble} from "billboard.js";
  //import bb from "billboard.js";

  let ecstats = [];

  async function loadGraph(){

const resECStats = await fetch("/api/v1/ec-stats");
ecstats = await resECStats.json();
var MyData = ["Electric Cars Use (%)"];
let countries = [];

ecstats.forEach(ecstat => {
        MyData.push(ecstat.ecu);
        countries.push(ecstat.country);
    });

    var chart = bb.generate({
  data: {
    type: "bubble", // for ESM specify as: bubble()
    xs: {
      "Country-A": "x0",
      "Country-B": "x1",
      "Country-C": "x2",
      "Country-D": "x3",
      "Country-E": "x4"
    },
    columns: [
	["x0", 30],
	["x1", 515],
	["x2", 319],
	["x3", 337],
	["x4", 164],
	["Country-A", {y:9631418, z:295734134}],
	["Country-B", {y:100210, z:51635256}],
	["Country-C", {y:547030, z:67022000}],
	["Country-D", {y:377835, z:127417244}],
	["Country-E", {y:464, z:76177}]
    ]
  },
  axis: {
    x: {
      padding: {
        left: 100,
        right: 20
      }
    },
    y: {
      padding: {
        top: 150,
        bottom: 100
      }
    }
  },
  tooltip: {
    format: {
      value: function(x) {
	  return x.toLocaleString();
      }
    }
  },
  bindto: "#bubbleCompare"
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
  <div id="bubbleCompare"></div>
</main>