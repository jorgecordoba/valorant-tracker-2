import { DateTime } from 'luxon';
import React, { useState } from 'react';
import { Row, Col, Container, Card, SSRProvider } from 'react-bootstrap'
import { FaBars } from 'react-icons/fa';
import { MatchByTeamTable } from '../../components/red_blue_table';
import SideBar from '../../components/sidebar';
import {getMatch} from '../../utils/queries'

export async function getStaticProps({ params }) {
    
  let match = await getMatch(params.match_id) 

  return {
    props: { match }, 
    revalidate: 10 // will be passed to the page component as props
  }
}

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' }
}

export default function Home(props) {
  const [toggled, setToggled] = useState(false);

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  const playersTeam = props.match.players.find(p => p.nick != p.character).team
  const enemyTeam = playersTeam == "Red" ? "Blue" : "Red"
  const bgcolor = props.match.rounds_won > props.match.rounds_lost ? "#229933" : "#CC2211"

  const dt = DateTime.fromISO(props.match.match_date)
  const date = dt.toLocaleString(DateTime.DATETIME_MED)

  return (    
    <SSRProvider>
    <Container fluid className="app" style={{backgroundImage:`url(https://res.cloudinary.com/chaoscs/image/upload/v1644755874/valorant/maps/${props.match.map.toLowerCase()}.png)`}}>
          <SideBar toggled={toggled} handleToggleSidebar={handleToggleSidebar}/>
      <main>
        <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
          <FaBars />
        </div>
     <Row>
        <Col>
            <Card className='shadow' style={{ opacity:"85%", padding: '12px', marginTop: "20px", height: "50px", backgroundColor:bgcolor, color: "white" }}>
              <div style={{display: "flex", justifyContent: "space-between"}}>
                 <h5>{props.match.map} - {date}</h5>
                 <h5>Result: {`${props.match.rounds_won} - ${props.match.rounds_lost}`}</h5>
              </div> 
            </Card>
        </Col>
    </Row>
      <Row>
        <Col>
              <MatchByTeamTable match={props.match} team={playersTeam} />             
        </Col>
        <Col>
              <MatchByTeamTable match={props.match} team={enemyTeam} />   
        </Col>
      </Row>
    </main>
    </Container> 
    </SSRProvider>   
  )
}
