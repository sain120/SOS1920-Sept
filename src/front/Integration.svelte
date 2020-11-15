<script>

let ecstats = [];
let fstats = [];

async function loadGraph(){

const resECStats = await fetch("/api/v1/ec-stats");
const resFCOstats = await fetch("/api/v1/cbp/");

ecstats = await resECStats.json();
fstats = await resFCOstats.json();

var MyData1 = [];
var MyData2 = [];
var Countries = [];

    ecstats.forEach(ecstat => {
        fstats.forEach(fstat => {
            if(ecstat.country == fstat.country || ecstat.country == "United_States" && fstat.country == "U.S"){
                MyData1.push(ecstat.rpc);
                MyData2.push(fstat.yfed);
                Countries.push(ecstat.country);
            }
        });
    });

    Highcharts.chart('container', {

chart: {
    type: 'column'
},

title: {
    text: 'Renta per cápita y años por duplicar población'
},

xAxis: [{
        categories: Countries,
        crosshair: true
}],

yAxis: [{
    className: 'highcharts-color-0',
    title: {
        text: 'Renta per cápita (Miles de $)'
    },
}, {
    className: 'highcharts-color-1',
    opposite: true,
    title: {
        text: 'Años en duplicar población'
    }
}],


plotOptions: {
    column: {
        borderRadius: 5
    }
},

series: [{
    name: 'Renta per cápita',
    data: MyData1,
}, {
    name: 'Años en x2 pob',
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
    <h2>Integración 1: API de Fernando</h2>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            Gráfico de barras con la renta per cápita por país y sus años estimados en duplicar la población actual.
        </p>
    </figure>
    <form method="get" action="/#/integrations">
        <button type="submit">Atrás</button>
    </form>
</main>