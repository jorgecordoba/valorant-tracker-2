import { Image } from 'react-bootstrap';
import DataTable from 'react-data-table-component';

const columns = [
    {
        name: 'Nick',
        selector: row => row.nick,
        sortable: true
    },
    {
        name: 'Agent',
        cell: row => <Image src={`/resources/agents/${row.character}_icon_32.png`} width="32px" fluid rounded/>
    },
    {
        name: 'Pos',
        selector: row => row.position
    },
    {
        name: 'Result',
        selector: row => `${row.kills}/${row.deaths}/${row.assists}`
    },
    {
        name: 'KDA',
        selector: row => row.kda_ratio
    },
    {
        name: 'ADR',
        selector: row => row.adr,
    },    
    {
        name: 'Hs',
        selector: row => row.head_shots_pct
    },
    {
        name: 'Ls',
        selector: row => row.leg_shots_pct
    },
    {
        name: 'FK',
        selector: row => row.first_kill_of_team
    },
    {
        name: 'FD',
        selector: row => row.first_to_die_of_team
    },
    {
        name: 'FK/FD',
        selector: row => row.kill_to_die_ration
    },    
];

const data = [
    {        
        name: "Chaos",
        nick: "LGO Chaos",
        score: "14-14",
        tier: 16,
        character: "Jett",
        kills: 30,
        deaths: 18,
        assists: 2,
        kda_ratio: "1.67",        
        c_cast_avg: 0.285714,
        q_cast_avg: 0.107143,
        e_cast_avg: 0.285714,
        x_cast: 3,        
        adr: 175,
        score: 7942,
        avg_score_per_round: 284,        
        head_shots_pct: "23.94",
        body_shots_pct: "73.24",
        leg_shots_pct: "2.82",
        first_kill_of_team: 8,
        first_to_die_of_team: 11,
        kill_to_die_ration: "0.73",
        position: 1
    }    
]

export function LatestMatchTable() {
    return (
        <DataTable
            columns={columns}
            data={data}
            theme="dark"
        />
    );
};