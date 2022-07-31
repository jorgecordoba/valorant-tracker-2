import {BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer} from 'recharts'
import DataTable from 'react-data-table-component';
import { Container, Row, Col } from 'react-bootstrap';

const columns = [
    {
        id: 'Name',
        name: 'Name',
        selector: row => row.player,
        sortable: true
    },
    {
        id: 'HS%',
        name: 'HS%',
        selector: row => parseFloat(row.hs).toFixed(2) + "%",
        sortable: true
    },
    {
        id: 'FKRatio',
        name: 'FK to FD',
        selector: row => parseFloat(row.fkratio).toFixed(2) + "%",
        sortable:true
    }    
]

function getData(players) {
    const result = []
    
    for (var entry of players) {
        console.log(entry.global)
        let playerHs = {
            player: entry.name,
            hs: parseFloat(entry.global.head_shots_pct),   
            fkratio: parseInt(entry.global.first_kill_of_team) / parseInt(entry.global.first_to_die_of_team),            
        }
        result.push(playerHs)
    }    
    return result.sort((a, b) => b.hs - a.hs);
}

export function PlayerStatsTable(props) {    
    
    
    return (
            <DataTable
                            columns={columns}
                            data={getData(props.players)}
                            responsive
                            defaultSortFieldId={'HS%'}
                            theme="dark"                                                 
                        /> 
    );
};