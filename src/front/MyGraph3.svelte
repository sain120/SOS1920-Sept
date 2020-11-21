<script>

  let ecstats = [];
  
  async function loadGraph(){
  
  const resECStats = await fetch("/api/v1/ec-stats");

  ecstats = await resECStats.json();

  var MyData3 = [];
  
      ecstats.forEach(ecstat => {
                  MyData3.push({
                  x: ecstat.rpc,
                  y: ecstat.cdepc,
                  z: ecstat.ecu, 
                  country: ecstat.country + " " + ecstat.year
              })
          });
  
      Highcharts.chart('container', {
  
  chart: {
      type: 'bubble',
      plotBorderWidth: 1,
      zoomType: 'xy'
  },
  
  legend: {
      enabled: false
  },
  
  title: {
      text: 'Uso de coches eléctricos, renta per cápita y emisiones per cápita'
  },
  
  subtitle: {
      text: 'Fuente: <a href="http://www.wikipedia.com/">Wikipedia</a>'
  },
  
  accessibility: {
      point: {
          valueDescriptionFormat: '{index}. {point.name}, Renta per cápita: {point.x} Mil $, Emisiones de CO2 per cápita: {point.y} Tons, Uso coches eléctricos: {point.z}%.'
      }
  },
  
  xAxis: {
      gridLineWidth: 1,
      title: {
          text: 'Renta per cápita'
      },
      labels: {
          format: '{value} Mil $'
      },
      /*
      plotLines: [{
          color: 'black',
          dashStyle: 'dot',
          width: 2,
          value: 65,
          label: {
              rotation: 0,
              y: 15,
              style: {
                  fontStyle: 'italic'
              },
              text: 'Safe fat intake 65g/day'
          },
          zIndex: 3
      }],
      */
      accessibility: {
          rangeDescription: ''
      }
  },
  
  yAxis: {
      startOnTick: false,
      endOnTick: false,
      title: {
          text: 'Emisiones de CO2 per cápita'
      },
      labels: {
          format: '{value} Tons'
      },
      maxPadding: 0.2,
      /*
      plotLines: [{
          color: 'black',
          dashStyle: 'dot',
          width: 2,
          value: 50,
          label: {
              align: 'right',
              style: {
                  fontStyle: 'italic'
              },
              text: 'Safe sugar intake 50g/day',
              x: -10
          },
          zIndex: 3
      }],
      */
      accessibility: {
          rangeDescription: ''
      }
  },
  
  tooltip: {
      useHTML: true,
      headerFormat: '<table>',
      pointFormat: '<tr><th colspan="2"><h3>{point.country}</h3></th></tr>' +
          '<tr><th>Renta per cápita:</th><td>{point.x} Mil $ </td></tr>' +
          '<tr><th>Emisiones de CO2 per cápita:</th><td>{point.y} Tons </td></tr>' +
          '<tr><th>Uso de coches eléctricos:</th><td>{point.z}%</td></tr>',
      footerFormat: '</table>',
      followPointer: true
  },
  
  plotOptions: {
      series: {
          dataLabels: {
              enabled: true,
              format: '{point.name}'
          }
      }
  },
  
  series: [{
      data: MyData3
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
      <h2>Uso de coches eléctricos vs Población vs Renta per capita</h2>
      <figure class="highcharts-figure">
          <div id="container"></div>
          <p class="highcharts-description">
              Nube de puntos mostrando la correlación entre el numero de habitantes de un país y su renta per cápita.
               El tamaño del punto se corresponde con el uso de coches electricos (%).
          </p>
      </figure>
      <form method="get" action="/">
          <button type="submit">Atrás</button>
      </form>
  </main>