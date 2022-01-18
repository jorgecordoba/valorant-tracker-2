import 'chart.js/auto';
import { Line } from 'react-chartjs-2';

function computRollingAverage(data, windowSize) {
  let currIx = 0;
  while (currIx < data.length) {
    const start = currIx - windowSize
    const end = currIx + windowSize    
    for (var prop in data[currIx]) {      
      if (prop != 'match_date') {
        let acc = 0
        let computed = 0;
        for (var i = start; i <= end; i++) {
          if (i >= 0 && i < data.length && data[i][prop]) {     
            acc = acc + data[i][prop]
            computed++
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
        labes: Object.keys(props.nicks),
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
      },
    };    

    if (props.rollingWindow) {
      computRollingAverage(props.data, props.rollingWindow)
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
            data: props.data,
            hidden: !props.nicks[entry].main,            
            parsing: {
                yAxisKey: entry,
                xAxisKey: 'match_date'
            }
        })
    }    

    return (              
        <Line options={options} data={data}>      
        </Line>            
    );
};