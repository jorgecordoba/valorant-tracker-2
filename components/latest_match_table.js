import React, { useState, useEffect  } from 'react';
import { Col, Image, Row, Container, Badge } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { DateTime } from "luxon";
import { ArrowRightSquare, ArrowLeftSquare, Display } from 'react-bootstrap-icons';

const columns = [
    {
        id: 'Rank',
        name: 'Rank',
        minWidth: "40px",
        cell: row => <Image src={`/resources/ranks/${row.tier}.png`} width="32px" fluid rounded/>
    },
    {
        id: 'Nick',
        name: 'Nick',
        minWidth: "112px",
        selector: row => row.nick,
        sortable: true
    },
    {
        id: 'Agent',
        name: 'Agt',
        minWidth: "40px",
        cell: row => <Image src={`/resources/agents/${row.character}_icon.png`} width="32px" fluid rounded/>
    },
    {
        id: 'Pos',
        name: 'Pos',
        minWidth: "70px",
        selector: row => row.position,
        sortable: true
    },
    {
        id: 'Result',
        name: 'Result',
        minWidth: "80px",
        selector: row => `${row.kills}/${row.deaths}/${row.assists}`,
        sortable: true
    },
    {
        id: 'KDA',
        name: 'KDA',
        minWidth: "71px",
        selector: row => row.kda_ratio,
        sortable: true,
    },
    {
        id: 'ADR',
        name: 'ADR',
        minWidth: "71px",
        selector: row => row.adr,
        sortable: true
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
        <Container>
            <Row>
                <Col>
                    <Badge bg="light" style={{width:"100%"}}>
                        <h5 style={{color: "black"}}><ArrowLeftSquare style={{cursor:'pointer', marginRight: "20px"}} href='#' onClick={() => setIndex(index < props.data.length -1 ? index + 1 : index)}>&lt;&lt;</ArrowLeftSquare><span style={{width:"60%", display:"inline-block"}}> {index == 0 ? 'Last Match' : DateTime.fromISO(props.data[index].match_date).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)} - Result: {`${props.data[index].rounds_won} - ${props.data[index].rounds_lost}`}</span> {index == 0 ? "" : <ArrowRightSquare  style={{cursor:'pointer'}}  onClick={() => setIndex(index > 0 ? index -1: index)}>&gt;&gt;</ArrowRightSquare>}</h5>
                    </Badge> 
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
        </Container>
    );
};