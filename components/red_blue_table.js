import React, { useState, useEffect  } from 'react';
import { Col, Image, Row, Card } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { DateTime } from "luxon";
import { ArrowRightSquare, ArrowLeftSquare, ArrowRight, ArrowRightCircle} from 'react-bootstrap-icons';
import { BsFillEyeFill, BsForwardFill } from 'react-icons/bs';
var consts = require("../utils/constants")

const cldbase = consts.cloudinary(consts.transformations.icon_32)

const rowStyles = [{
        when: row => row.team == "Blue" && row.nick == row.character,
        style: {
        backgroundColor: '#4A8DC6',
        color: 'white',
        opacity: 0.65,
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
        opacity: 0.65,
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
        compact: true,
        hide: 100000
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
        id: 'Hs',
        name: 'Hs',
        minWidth: "71px",
        selector: row => parseFloat(row.head_shots_pct).toFixed(2) + "%",
        sortable: true
    },    
];

function filterByTeam(data, team) {
    return data.filter(p => p.team == team)
}

export function MatchByTeamTable(props) {
    const data = filterByTeam(props.match.players, props.team)
    return (      
        <React.Fragment>
            <Card className='shadow' style={{ padding: '12px', marginTop: "20px", height: `$350px`, opacity: 0.85}}>
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
