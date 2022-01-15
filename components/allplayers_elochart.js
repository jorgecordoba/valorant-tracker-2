import 'chart.js/auto';
import { Line } from 'react-chartjs-2';

export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Elo evolution',
      },
    },
  };

export function AllPlayersEloChart(props) {
    let data = {
        labes: Object.keys(props.nicks),
        datasets: []
    }
    
    for (var entry in props.nicks) {
        var randomColor = Math.floor(Math.random()*16777215).toString(16);
        console.log(entry)
        data.datasets.push( {
            label: props.nicks[entry].nick,
            borderColor: props.nicks[entry].color ? props.nicks[entry].color : `#${randomColor}`,
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