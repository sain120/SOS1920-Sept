<script>

let ecstats = [];
let fstats = [];

async function loadGraph(){

const resECStats = await fetch("/api/v1/ec-stats");
const resFCOstats = await fetch("https://sos1920-sep-fco.herokuapp.com/api/v1/cbp");

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
    type: 'column',
    styledMode: true
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
    data: MyData1
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
</main>

<style>
@import 'https://code.highcharts.com/css/highcharts.css';

    .highcharts-figure, .highcharts-data-table table {
        min-width: 310px; 
        max-width: 800px;
        margin: 1em auto;
    }
    
    .highcharts-data-table table {
        font-family: Verdana, sans-serif;
        border-collapse: collapse;
        border: 1px solid #EBEBEB;
        margin: 10px auto;
        text-align: center;
        width: 100%;
        max-width: 500px;
    }
    .highcharts-data-table caption {
        padding: 1em 0;
        font-size: 1.2em;
        color: #555;
    }
    .highcharts-data-table th {
        font-weight: 600;
        padding: 0.5em;
    }
    .highcharts-data-table td, .highcharts-data-table th, .highcharts-data-table caption {
        padding: 0.5em;
    }
    .highcharts-data-table thead tr, .highcharts-data-table tr:nth-child(even) {
        background: #f8f8f8;
    }
    .highcharts-data-table tr:hover {
        background: #f1f7ff;
    }
    
    
    /* Link the series colors to axis colors */
    .highcharts-color-0 {
        fill: #7cb5ec;
        stroke: #7cb5ec;
    }
    .highcharts-axis.highcharts-color-0 .highcharts-axis-line {
        stroke: #7cb5ec;
    }
    .highcharts-axis.highcharts-color-0 text {
        fill: #7cb5ec;
    }
    .highcharts-color-1 {
        fill: #90ed7d;
        stroke: #90ed7d;
    }
    .highcharts-axis.highcharts-color-1 .highcharts-axis-line {
        stroke: #90ed7d;
    }
    .highcharts-axis.highcharts-color-1 text {
        fill: #90ed7d;
    }
    
    
    .highcharts-yaxis .highcharts-axis-line {
        stroke-width: 2px;
    }
</style>