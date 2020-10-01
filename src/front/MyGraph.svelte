<script>

    let ecstats = [];
    //let MyData = []
async function loadGraph(){

let MyData = [];

const resData = await fetch("/data");
const resECStats = await fetch("/api/v1/ec-stats");
ecstats = await resECStats.json();
MyData = await resData.json();

const MyData2 =
	[{
        name: 'EEUU',
        color: 'rgba(223, 83, 83, .5)',
        data: [[0.66, 14.65]]
	},
	{
        name: 'China',
        color: 'rgba(83, 223, 83, .5)',
        data: [[0.84, 6.51]]
	},
	{
        name: 'France',
        color: 'rgba(83, 83, 223, .5)',
        data: [[1.2, 4.72]]
    }];

Highcharts.chart('container', {
    chart: {
        type: 'scatter',
        zoomType: 'xy'
    },
    title: {
        text: 'Electric cars use vs C02 Emisions by Country'
    },
    subtitle: {
        text: 'Source: Wikipedia'
    },
    xAxis: {
        title: {
            enabled: true,
            text: 'Electric Cars Use (%)'
        },
        startOnTick: true,
        endOnTick: true,
        showLastLabel: true
    },
    yAxis: {
        title: {
            text: 'C02 Emisions Per Capita (tons)'
        }
    },
    legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 100,
        y: 70,
        floating: true,
        backgroundColor: Highcharts.defaultOptions.chart.backgroundColor,
        borderWidth: 1
    },
    plotOptions: {
        scatter: {
            marker: {
                radius: 5,
                states: {
                    hover: {
                        enabled: true,
                        lineColor: 'rgb(100,100,100)'
                    }
                }
            },
            states: {
                hover: {
                    marker: {
                        enabled: false
                    }
                }
            },
            tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: '{point.x} %, {point.y} tons'
            }
        }
    },
    series: MyData
});

}
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
	<script src="https://code.highcharts.com/modules/series-label.js"></script>
	<script src="https://code.highcharts.com/modules/exporting.js"></script>
	<script src="https://code.highcharts.com/modules/export-data.js"></script>
	<script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>

<main>
    <h2>Electric cars use vs CO2 emisions</h2>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            Scatter plot showing the relationship between the use of electric cars and the emisions of CO2 per country
        </p>
        {#each ecstats as ecstat}
        <p>{ecstat.country}</p>
        {/each}
    </figure>
</main>