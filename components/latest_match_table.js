import React, { useState, useEffect  } from 'react';
import { Col, Image, Row, Card } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { DateTime } from "luxon";
import { ArrowRightSquare, ArrowLeftSquare} from 'react-bootstrap-icons';
import { BsFillEyeFill, BsForwardFill } from 'react-icons/bs';
import Link from 'next/link'
var consts = require("../utils/constants")

const cldbase = consts.cloudinary(consts.transformations.icon_32)

const rowStyles = [{
        when: row => row.team == "Blue" && row.nick == row.character,
        style: {
        backgroundColor: '#4A8DC6',
        color: 'white',
        opacity: 0.25,
        '&:hover': {
            cursor: 'pointer',
        },
        }
    },
    {
        when: row => row.team == "Red" && row.nick == row.character,
        style: {
        backgroundColor: '#136200',
        color: 'white',
        opacity: 0.25,
        '&:hover': {
            cursor: 'pointer',
        },
        }
    },
    {
        when: row => row.team == "Red" && row.nick != row.character,
        style: {
        backgroundColor: '#136200',
        color: 'white',
        border: '3px solid',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',        
        '&:hover': {
            cursor: 'pointer',
        },
        }
    },   
    {
        when: row => row.team == "Blue" && row.nick != row.character,
        style: {
        backgroundColor: '#006083',
        border: '3px solid',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', 
        color: 'white',        
        '&:hover': {
            cursor: 'pointer',
        },
        }
    }, 
]

const columns = [
    {
        id: 'Nick',
        name: 'Nick',
        minWidth: "112px",
        selector: row => { 
            if (row.nick == row.character) {
                return row.nick
            }
            return (<span><Image src={`/resources/icons/star_icon_32.png`} width="12px" style={{marginRight: '4px', marginTop: '-4px'}}/>{row.nick}</span>)
        },
        sortable: true
    },
    {
        id: 'Rank',
        name: 'Rank',
        minWidth: "100px",
        cell: row => {    
            let result = ""
            let rankchange = (row.new_tier != row.tier) && row.tier != 0
            if (row.nick == row.character) {
                result = <span><Image src={`${cldbase}/ranks/rank_${row.tier}`} width="32px" fluid rounded/> </span>
            }
            else if (rankchange) {
                result = <span><Image src={`${cldbase}/ranks/rank_${row.tier}`} width="32px" fluid rounded/> <span style={{marginLeft: '4px', marginRight: '4px', fontSize: 'large', color: row.elo_change < 0 ? "#FF0000" : "#31FF00"}}><BsForwardFill /></span><Image src={`${cldbase}/ranks/rank_${row.new_tier}`} width="32px" fluid rounded/></span>
            }
            else if (row.tier == 0) {
                result = <span><Image src={`${cldbase}/ranks/rank_${row.tier}`} width="32px" fluid rounded/> <span style={{marginLeft: '4px', color: "white"}}> {'Ranking'} </span></span>
            }
            else {
                result = <span><Image src={`${cldbase}/ranks/rank_${row.tier}`} width="32px" fluid rounded/> <span style={{marginLeft: '4px', color: row.elo_change < 0 ? "#FF0000" : "#31FF00"}}>{row.new_ranking - row.elo_change} <BsForwardFill /> {row.new_ranking}</span></span>
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
        cell: row => <Image src={`${cldbase}/agents/icons/${row.character.toLowerCase().replace("/", "")}`} width="32px" fluid rounded/>,
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

function filterData(data, filter) {
    if (filter) {
        return data.filter(p => p.nick != p.character)
    }
    return data
}

export function LatestMatchTable(props) {
    const [index, setIndex] = useState(0)
    const [filter, setFilter] = useState(false)
    const data = filterData(props.data[index].players, filter)
    return (      
        <React.Fragment>
            <Card className='shadow' style={{ padding: '12px', marginTop: "20px", height: `${85 + data.length * 53}px`}}>
                <Row>
                    <Col>                                        
                            <h5 style={{color: "white"}}>
                                <div style={{display: "flex", justifyContent: "space-around", backgroundColor: "black"}}>
                                    <ArrowLeftSquare style={{cursor:'pointer', marginLeft: "10px", marginRight: "10px"}} href='#' onClick={() => setIndex(index < props.data.length -1 ? index + 1 : index)}>&lt;&lt;</ArrowLeftSquare>
                                    <span style={{display:"inline-block"}}><Link href={`/match/${props.data[index].match_id}`}>{DateTime.fromISO(props.data[index].match_date).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)} - {`${props.data[index].map}`} - Result: {`${props.data[index].rounds_won} - ${props.data[index].rounds_lost}`}</Link></span> 
                                    <span style={{marginLeft: "10px", marginRight: "10px", cursor:'pointer'}} onClick={() => setFilter(!filter)}> <BsFillEyeFill /> </span>
                                    <ArrowRightSquare  style={{cursor:'pointer', marginLeft: "10px", marginRight: "10px"}}  onClick={() => setIndex(index > 0 ? index -1: index)}>&gt;&gt;</ArrowRightSquare>
                                </div> 
                            </h5>                    
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <DataTable
                            columns={columns}
                            data={data}
                            responsive
                            defaultSortFieldId={'Pos'}
                            theme="dark"
                            conditionalRowStyles={rowStyles}                        
                        />
                    </Col>
                </Row>      
            </Card>
        </React.Fragment>
    );
};
