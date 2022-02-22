import 'chart.js/auto';
import { Line } from 'react-chartjs-2';

function computRollingAverage(data, windowSize, keyName) {
  let currIx = 0;
  while (currIx < data.length) {
    const start = currIx - windowSize
    const end = currIx + windowSize    
    for (var prop in data[currIx]) {      
      if (prop != keyName) {
        let acc = 0
        let computed = 0;
        for (var i = start; i <= end; i++) {
          if (i >= 0 && i < data.length && data[i][prop]) {  
            let value = parseFloat(data[i][prop])
            
            if (!isNaN(value)) {
              acc = acc + value
              computed++
            }
          }
        }
        data[currIx][prop] = acc / computed        
      }
    }
    currIx++
  }
  return data
}

export function AllPlayersEvolutionChart(props) {
    let data = {
        labels: props.data.map(p => p[props.xKeyName]),
        datasets: []
    }

    const options = {
      responsive: true,
      maintainAspectRatio: false,                
      plugins: {
        legend: {
          position: 'bottom',
        },
        title: {
          display: true,
          text: props.title,
        },
      }
    };    

    if (props.rollingWindow) {
      computRollingAverage(props.data, props.rollingWindow, props.xKeyName)
    }
    
    for (var entry in props.nicks) {
        var randomColor = Math.floor(Math.random()*16777215).toString(16);
        data.datasets.push( {
            label: props.nicks[entry].nick,
            borderColor: props.nicks[entry].color ? props.nicks[entry].color : `#${randomColor}`,
            backgroundColor: props.nicks[entry].color ? props.nicks[entry].color : `#${randomColor}`,
            cubicInterpolationMode: 'monotone',       
            lineTension: 0.1,     
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: props.nicks[entry].color ? props.nicks[entry].color : `#${randomColor}`,
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            spanGaps: true,
            data: props.data.map(p => {return {x: p[props.xKeyName], y: p[entry]}}),
            hidden: false,
            parsing: {
              xAxisKey: "x",
              yAxisKey: "y"
            }
        })
    }  

    return (              
        <Line options={options} data={data}>      
        </Line>            
    );
};