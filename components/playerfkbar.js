import {BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer} from 'recharts'

function getData(players) {
    const result = []
    
    for (var entry of players) {
        let playerHs = {
            player: entry.name,
            fk: parseFloat(entry.global.first_kill_of_team),   
            fd: -parseFloat(entry.global.first_to_die_of_team),            
        }
        result.push(playerHs)
    }
    return result
}

export function PlayerFkBar(props) {    
    return (
            <ResponsiveContainer height={400} width={"100%"} debounce={1}>
                <BarChart data={getData(props.players)} stackOffset="sign">                    
                    <XAxis dataKey="player" />
                    <YAxis/>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36}/>
                    <Bar dataKey="fk" name="First Kill of Team" stackId={"stack"} fill="#11AACC" />        
                    <Bar dataKey="fd" name="First To Die of Team" stackId={"stack"} fill="#CC3333" />                                            
                </BarChart>
            </ResponsiveContainer>        
    );
};