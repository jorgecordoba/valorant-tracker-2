import {BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer} from 'recharts'
import DataTable from 'react-data-table-component';
import { Container, Row, Col } from 'react-bootstrap';

const columns = [
    {
        id: 'Name',
        name: 'Name',
        selector: row => row.name,
        sortable: true
    },
    {
        id: 'HS%',
        name: 'HS%',
        selector: row => parseFloat(row.global.head_shots_pct).toFixed(2) + "%",
        sortable: true
    },
    {
        id: 'BS%',
        name: 'BS%',
        selector: row => parseFloat(row.global.body_shots_pct).toFixed(2) + "%",
        sortable:true
    },
    {
        id: 'LS%',
        name: 'LS%',
        selector: row => parseFloat(row.global.leg_shots_pct).toFixed(2) + "%",
        sortable:true
    }
]

function getData(players) {
    const result = []
    
    for (var entry of players) {
        let playerHs = {
            player: entry.name,
            hs: parseInt(entry.global.head_shots_pct),   
            ls: parseInt(entry.global.leg_shots_pct),
            bs: parseInt(entry.global.body_shots_pct)
        }
        result.push(playerHs)
    }
    return result
}

export function PlayerAccBar(props) {    
    return (
            <ResponsiveContainer height={400} width={"100%"}>
                <BarChart data={getData(props.players)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="player" />
                    <YAxis/>
                    <Tooltip />
                    <Legend verticalAlign="top" height={36}/>
                    <Bar dataKey="ls" unit="%" name="Leg Shots" stackId={"stack"} fill="#EE8888" />        
                    <Bar dataKey="bs" unit="%"name="Body Shots" stackId={"stack"} fill="#8888FF" />                        
                    <Bar dataKey="hs" unit="%"name="Head Shots" stackId={"stack"} fill="#88DD88" />                        
                </BarChart>
            </ResponsiveContainer>        
    );
};