<script>

let ecstats = [];

async function loadGraph(){

const resECStats = await fetch("/api/v1/ec-stats");
ecstats = await resECStats.json();
var MyData3 = [];

    const colors = ['rgba(83, 83, 223, .7)','rgba(83, 223, 83, .7)',
    'rgba(223, 83, 83, .7)','rgba(42, 83, 223, .7)',
    'rgba(150, 42, 223, .7)','rgba(83, 150, 42, .7)',
    'rgba(10, 223, 223, .7)'];
    var ncolor = 0;

    ecstats.forEach(ecstat => {
        MyData3.push({
            name: ecstat.country + " " + ecstat.year,
            color: colors[ncolor%(ncolor.length)],
            data: [[parseFloat(ecstat.ecu), parseFloat(ecstat.cdepc)]]
        })
        ncolor++;
    });

    Highcharts.chart('container', {
    title: {
        text: 'Combination chart'
    },
    xAxis: {
        categories: ['Apples', 'Oranges', 'Pears', 'Bananas', 'Plums']
    },
    labels: {
        items: [{
            html: 'Total fruit consumption',
            style: {
                left: '50px',
                top: '18px',
                color: ( // theme
                    Highcharts.defaultOptions.title.style &&
                    Highcharts.defaultOptions.title.style.color
                ) || 'black'
            }
        }]
    },
    series: [{
        type: 'column',
        name: 'Jane',
        data: [3, 2, 1, 3, 4]
    }, {
        type: 'column',
        name: 'John',
        data: [2, 3, 5, 7, 6]
    }, {
        type: 'column',
        name: 'Joe',
        data: [4, 3, 3, 9, 0]
    }, {
        type: 'spline',
        name: 'Average',
        data: [3, 2.67, 3, 6.33, 3.33],
        marker: {
            lineWidth: 2,
            lineColor: Highcharts.getOptions().colors[3],
            fillColor: 'white'
        }
    }, {
        type: 'pie',
        name: 'Total consumption',
        data: [{
            name: 'Jane',
            y: 13,
            color: Highcharts.getOptions().colors[0] // Jane's color
        }, {
            name: 'John',
            y: 23,
            color: Highcharts.getOptions().colors[1] // John's color
        }, {
            name: 'Joe',
            y: 19,
            color: Highcharts.getOptions().colors[2] // Joe's color
        }],
        center: [100, 80],
        size: 100,
        showInLegend: false,
        dataLabels: {
            enabled: false
        }
    }]
});

}
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
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
    </figure>
</main>