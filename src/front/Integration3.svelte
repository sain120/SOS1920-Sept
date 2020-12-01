<script>

let ecstats = [];
let rsstats = [];

async function loadGraph(){

const resECStats = await fetch("/api/v1/ec-stats");
const resRSSstats = await fetch("/api/v3/oil-coal-nuclear-energy-consumption-stats");


ecstats = await resECStats.json();
rsstats = await resRSSstats.json();

var MyData1 = [];
var MyData2 = [];
var Countries = [];

    ecstats.forEach(ecstat => {
        rsstats.forEach(rsstat => {
            if(ecstat.country == rsstat.country){
                MyData1.push(ecstat.ecu);
                MyData2.push(rsstat["oil-consumption"]);
                Countries.push(ecstat.country);
            }
        });
    });

    Highcharts.chart('container', {

chart: {
    type: 'column'
},

title: {
    text: 'Uso de coches eléctricos y consumo de petróleo'
},

xAxis: [{
        categories: Countries,
        crosshair: true
}],

yAxis: [{
    className: 'highcharts-color-0',
    title: {
        text: 'Uso de coches eléctricos (%)'
    },
}, {
    className: 'highcharts-color-1',
    opposite: true,
    title: {
        text: 'Consumo de petróleo'
    }
}],


plotOptions: {
    column: {
        borderRadius: 5
    }
},

series: [{
    name: 'Uso de cocohes eléctricos',
    data: MyData1,
}, {
    name: 'Consumo de petróleo',
    data: MyData2,
    yAxis: 1
}]

});

}
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>

<main>
    <h2>Integración 3: API de Grupo 9</h2>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            Grafico de barras con el porcentaje de coches eléctricos por países y su consumo de petróleo.
        </p>
    </figure>

    <form method="get" action="/#/integrations">
        <button type="submit">Atrás</button>
    </form>
</main>