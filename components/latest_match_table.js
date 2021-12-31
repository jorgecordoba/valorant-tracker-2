import { Image } from 'react-bootstrap';
import DataTable from 'react-data-table-component';

const columns = [
    {
        name: 'Rank',
        cell: row => <Image src={`/resources/ranks/${row.tier}.png`} width="32px" fluid rounded/>
    },
    {
        name: 'Nick',
        selector: row => row.nick,
        sortable: true
    },
    {
        name: 'Agent',
        cell: row => <Image src={`/resources/agents/${row.character}_icon.png`} width="32px" fluid rounded/>
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
    },
    {
        "player_id": "6453320d-13cd-561f-ab12-cced780740a0",
        "name": "Weilly",
        "nick": "LGO Wallux",
        "tier_name": "Gold 1",
        "new_tier_name": "Gold 1",
        "tier": 12,
        "new_tier": 12,
        "elo_change": 0,
        "new_elo": 928,
        "new_ranking": 28,
        "team": "Red",
        "character": "Breach",
        "kills": 15,
        "deaths": 22,
        "assists": 6,
        "kda_ratio": "0.68",
        "c_cast": 7,
        "e_cast": 17,
        "q_cast": 18,
        "c_cast_avg": 0.25,
        "q_cast_avg": 0.642857,
        "e_cast_avg": 0.607143,
        "x_cast": 4,
        "damage_made": 2872,
        "adr": 103,
        "score": 4179,
        "avg_score_per_round": 149,
        "head_shots": 10,
        "body_shots": 35,
        "leg_shots": 9,
        "head_shots_pct": "18.52",
        "body_shots_pct": "64.81",
        "leg_shots_pct": "16.67",
        "first_kill_of_team": 4,
        "first_to_die_of_team": 3,
        "kill_to_die_ration": "1.33",
        "position": 10
        },
        {
            "player_id": "96bc3794-808f-55bd-9f2b-03b6ec50eeea",
            "name": "Iskes",
            "nick": "Iskes",
            "tier_name": "Platinum 1",
            "new_tier_name": "Platinum 1",
            "tier": 15,
            "new_tier": 15,
            "elo_change": 0,
            "new_elo": 1247,
            "new_ranking": 47,
            "team": "Red",
            "character": "Viper",
            "kills": 16,
            "deaths": 22,
            "assists": 6,
            "kda_ratio": "0.73",
            "c_cast": 29,
            "e_cast": 23,
            "q_cast": 17,
            "c_cast_avg": 1.03571,
            "q_cast_avg": 0.607143,
            "e_cast_avg": 0.821429,
            "x_cast": 4,
            "damage_made": 2882,
            "adr": 103,
            "score": 4454,
            "avg_score_per_round": 159,
            "head_shots": 10,
            "body_shots": 25,
            "leg_shots": 2,
            "head_shots_pct": "27.03",
            "body_shots_pct": "67.57",
            "leg_shots_pct": "5.41",
            "first_kill_of_team": 3,
            "first_to_die_of_team": 7,
            "kill_to_die_ration": "0.43",
            "position": 9
            },
            {
            "player_id": "f9c4d7ab-e6a8-5bec-9d0f-6efa283f0df5",
            "name": "Souler",
            "nick": "S0uL3r",
            "tier_name": "Platinum 1",
            "new_tier_name": "Platinum 1",
            "tier": 15,
            "new_tier": 15,
            "elo_change": 0,
            "new_elo": 1259,
            "new_ranking": 59,
            "team": "Red",
            "character": "Chamber",
            "kills": 20,
            "deaths": 20,
            "assists": 4,
            "kda_ratio": "1.00",
            "c_cast": 36,
            "e_cast": 10,
            "q_cast": 7,
            "c_cast_avg": 1.28571,
            "q_cast_avg": 0.25,
            "e_cast_avg": 0.357143,
            "x_cast": 2,
            "damage_made": 4019,
            "adr": 144,
            "score": 5953,
            "avg_score_per_round": 213,
            "head_shots": 9,
            "body_shots": 48,
            "leg_shots": 6,
            "head_shots_pct": "14.29",
            "body_shots_pct": "76.19",
            "leg_shots_pct": "9.52",
            "first_kill_of_team": 6,
            "first_to_die_of_team": 3,
            "kill_to_die_ration": "2.00",
            "position": 6
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