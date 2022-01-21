import React, { useState, useEffect  } from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { DateTime } from "luxon";
import { ArrowRightSquare, ArrowLeftSquare, ArrowRight, ArrowRightCircle} from 'react-bootstrap-icons';
import { BsForwardFill } from 'react-icons/bs';

const columns = [
    {
        id: 'Nick',
        name: 'Nick',
        minWidth: "112px",
        selector: row => row.nick,
        sortable: true
    },
    {
        id: 'Rank',
        name: 'Rank',
        minWidth: "100px",
        cell: row => {    
            let result = ""
            let rankchange = (row.new_tier != row.tier) && row.tier != 0

            if (rankchange) {
                result = <span><Image src={`/resources/ranks/${row.tier}.png`} width="32px" fluid rounded/> <span style={{marginLeft: '4px', marginRight: '4px', fontSize: 'large', color: row.elo_change < 0 ? "red" : "green"}}><BsForwardFill /></span><Image src={`/resources/ranks/${row.new_tier}.png`} width="32px" fluid rounded/></span>
            }
            else if (row.tier == 0) {
                result = <span><Image src={`/resources/ranks/${row.tier}.png`} width="32px" fluid rounded/> <span style={{marginLeft: '4px', color: "white"}}> {'Ranking'} </span></span>
            }
            else {
                result = <span><Image src={`/resources/ranks/${row.tier}.png`} width="32px" fluid rounded/> <span style={{marginLeft: '4px', color: row.elo_change < 0 ? "red" : "green"}}>{row.new_ranking - row.elo_change} <BsForwardFill /> {row.new_ranking}</span></span>
            }
                        

            return (
                result
            )
        },
        compact: true
    },
    {
        id: 'Agent',
        name: 'Agt',
        minWidth: "40px",
        cell: row => <Image src={`/resources/agents/${row.character.toLowerCase()}_icon.png`} width="32px" fluid rounded/>,
        compact: true
    },
    {
        id: 'Pos',
        name: 'Pos',
        minWidth: "10px",
        selector: row => row.position,
        sortable: true,
        compact: true
    },
    {
        id: 'Result',
        name: 'Result',
        minWidth: "80px",
        selector: row => `${row.kills}/${row.deaths}/${row.assists}`,
        sortable: true,
        compact: true
    },
    {
        id: 'KDA',
        name: 'KDA',
        minWidth: "71px",
        selector: row => row.kda_ratio,
        sortable: true,
        compact: true
    },
    {
        id: 'ADR',
        name: 'ADR',
        minWidth: "71px",
        selector: row => row.adr,
        sortable: true,
        compact: true
    },    
    {
        id: 'Hs',
        name: 'Hs',
        minWidth: "71px",
        selector: row => parseFloat(row.head_shots_pct).toFixed(2) + "%",
        sortable: true
    },
    {
        id: 'Ls',
        name: 'Ls',
        selector: row => parseFloat(row.leg_shots_pct).toFixed(2) + "%",
        sortable: true
    },
    {
        id: 'FK',
        name: 'FK',
        minWidth: "71px",
        selector: row => row.first_kill_of_team
    },
    {
        id: 'FD',
        name: 'FD',
        minWidth: "71px",
        selector: row => row.first_to_die_of_team
    },
    {
        id: 'FK/FD',
        name: 'FK/FD',
        minWidth: "71px",
        selector: row => row.kill_to_die_ration,
        sortable: true
    },    
];



export function LatestMatchTable(props) {
    const [index, setIndex] = useState(0)
    return (      
        <React.Fragment>
            <Row>
                <Col>                                        
                        <h5 style={{color: "white"}}>
                            <div style={{display: "flex", justifyContent: "space-around", backgroundColor: "black"}}>
                                <ArrowLeftSquare style={{cursor:'pointer', marginLeft: "10px", marginRight: "10px"}} href='#' onClick={() => setIndex(index < props.data.length -1 ? index + 1 : index)}>&lt;&lt;</ArrowLeftSquare>
                                <span style={{display:"inline-block"}}> {DateTime.fromISO(props.data[index].match_date).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)} - {`${props.data[index].map}`} - Result: {`${props.data[index].rounds_won} - ${props.data[index].rounds_lost}`}</span> 
                                <ArrowRightSquare  style={{cursor:'pointer', marginLeft: "10px", marginRight: "10px"}}  onClick={() => setIndex(index > 0 ? index -1: index)}>&gt;&gt;</ArrowRightSquare>
                            </div> 
                        </h5>                    
                </Col>
            </Row>
            <Row>
                <Col>
                    <DataTable
                        columns={columns}
                        data={props.data[index].players}
                        responsive
                        defaultSortFieldId={'Pos'}
                        theme="dark"
                    />
                </Col>
            </Row>      
        </React.Fragment>
    );
};