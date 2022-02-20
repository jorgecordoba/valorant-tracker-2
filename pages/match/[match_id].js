import { DateTime } from 'luxon';
import React, { useState } from 'react';
import { Row, Col, Container, Card, SSRProvider } from 'react-bootstrap'
import { FaBars } from 'react-icons/fa';
import { MatchByTeamTable } from '../../components/red_blue_table';
import SideBar from '../../components/sidebar';
import { ArrowRightSquare, ArrowLeftSquare} from 'react-bootstrap-icons';
import {getMatches} from '../../utils/queries'

export async function getStaticProps({ params }) {
      
  let matches = await getMatches(null, null)
  let index = matches.findIndex(p => p.match_id = params.match_id)

  return {
    props: { matches, index }, 
    revalidate: 10 // will be passed to the page component as props
  }
}

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' }
}

export default function Home(props) {
  const [index, setIndex] = useState(props.index)
  const [toggled, setToggled] = useState(false);

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  console.log(props)

  const playersTeam = props.matches[index].players.find(p => p.nick != p.character).team
  const enemyTeam = playersTeam == "Red" ? "Blue" : "Red"
  const bgcolor = props.matches[index].rounds_won > props.matches[index].rounds_lost ? "#229933" : "#CC2211"

  const dt = DateTime.fromISO(props.matches[index].match_date)
  const date = dt.toLocaleString(DateTime.DATETIME_MED)

  return (    
    <SSRProvider>
    <Container fluid className="app" style={{backgroundImage:`url(https://res.cloudinary.com/chaoscs/image/upload/v1644755874/valorant/maps/${props.matches[index].map.toLowerCase()}.png)`}}>
          <SideBar toggled={toggled} handleToggleSidebar={handleToggleSidebar}/>
      <main>
        <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
          <FaBars />
        </div>
     <Row>
        <Col>
            <Card className='shadow' style={{ opacity:"85%", paddingTop: "14px", marginTop: "20px", height: "50px", backgroundColor:bgcolor, color: "white" }}>
                <h6 style={{color: "white"}}>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <ArrowLeftSquare style={{cursor:'pointer', marginLeft: "10px", marginRight: "10px", marginTop: "3px"}} href='#' onClick={() => setIndex(index < props.matches.length -1 ? index + 1 : index)}>&lt;&lt;</ArrowLeftSquare>
                        <span style={{display:"inline-block"}}>{DateTime.fromISO(props.matches[index].match_date).toLocaleString(DateTime.DATETIME_SHORT)} - {`${props.matches[index].map}`} - {`${props.matches[index].rounds_won} - ${props.matches[index].rounds_lost}`}</span>                         
                        <ArrowRightSquare  style={{cursor:'pointer', marginLeft: "10px", marginRight: "10px", marginTop: "3px"}}  onClick={() => setIndex(index > 0 ? index -1: index)}>&gt;&gt;</ArrowRightSquare>
                    </div> 
                </h6> 
            </Card>
        </Col>
    </Row>
      <Row>
        <Col>
              <MatchByTeamTable match={props.matches[index]} team={playersTeam} />             
        </Col>
        <Col>
              <MatchByTeamTable match={props.matches[index]} team={enemyTeam} />   
        </Col>
      </Row>
    </main>
    </Container> 
    </SSRProvider>   
  )
}
