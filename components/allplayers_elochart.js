
import { LineChart,CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from "recharts";   

export function AllPlayersEloChart(props) {
    let lines = []    
    
    for (var entry in props.nicks) {
        var randomColor = Math.floor(Math.random()*16777215).toString(16);
        lines.push(<Line type="monotone" connectNulls={true} dataKey={entry} stroke={`#${randomColor}`} />)
    }

    return (
        <ResponsiveContainer width='100%' height={350}>
        <LineChart height={350} data={props.data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={['dataMin - 50', 'dataMax + 50']}/>
            <Tooltip />
            <Legend />            
            {lines}            
        </LineChart>
    </ResponsiveContainer>
    );
};