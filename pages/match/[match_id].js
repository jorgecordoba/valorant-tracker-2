import { DateTime } from 'luxon';
import React, { useState } from 'react';
import Link from 'next/link'
import { Row, Col, Container, Card, SSRProvider } from 'react-bootstrap'
import { FaBars } from 'react-icons/fa';
import { MatchByTeamTable } from '../../components/red_blue_table';
import SideBar from '../../components/sidebar';
import { ArrowRightSquare, ArrowLeftSquare} from 'react-bootstrap-icons';
import {getMatch, getPreviousMatch, getNextMatch, getPlayerMatchStats} from '../../utils/queries'
import { AllPlayersEvolutionChart } from '../../components/allplayers_evochart';

export async function getStaticProps({ params }) {
      
  let match = await getMatch(params.match_id)
  let prvMatchId = await getPreviousMatch(params.match_id) ?? null
  let nxtMatchId = await getNextMatch(params.match_id) ?? null
  let stats = await getPlayerMatchStats(params.match_id)

  return {
    props: { match, prvMatchId, nxtMatchId, stats }, 
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

  console.log(JSON.stringify(props.stats.kda))


  const playersTeam = props.match.players.find(p => p.nick != p.character).team
  const enemyTeam = playersTeam == "Red" ? "Blue" : "Red"
  const bgcolor = props.match.rounds_won > props.match.rounds_lost ? "#229933" : "#CC2211"

  const dt = DateTime.fromISO(props.match.match_date)
  const date = dt.toLocaleString(DateTime.DATETIME_MED)
  let prvLink = <ArrowLeftSquare style={{marginLeft: "10px", marginRight: "10px", marginTop: "3px"}}>&lt;&lt;</ArrowLeftSquare>
  let nxtLink = <ArrowRightSquare  style={{marginLeft: "10px", marginRight: "10px", marginTop: "3px"}}>&gt;&gt;</ArrowRightSquare>
  if (props.prvMatchId) {
    prvLink = <Link href={`/match/${props.prvMatchId}`} passHref><a><ArrowLeftSquare style={{cursor:'pointer', marginLeft: "10px", marginRight: "10px", marginTop: "3px"}}>&lt;&lt;</ArrowLeftSquare></a></Link>;
  }

  if (props.nxtMatchId) {
    nxtLink = <Link href={`/match/${props.nxtMatchId}`} passHref><a><ArrowRightSquare style={{cursor:'pointer', marginLeft: "10px", marginRight: "10px", marginTop: "3px"}}>&gt;&gt;</ArrowRightSquare></a></Link>
  }

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
            <Card className='shadow' style={{ opacity:"85%", paddingTop: "14px", marginTop: "20px", height: "50px", backgroundColor:bgcolor, color: "white" }}>
                <h6 style={{color: "white"}}>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        {prvLink}
                        <span style={{display:"inline-block"}}>{DateTime.fromISO(props.match.match_date).toLocaleString(DateTime.DATETIME_SHORT)} - {`${props.match.map}`} - {`${props.match.rounds_won} - ${props.match.rounds_lost}`}</span>                         
                        {nxtLink}
                    </div> 
                </h6> 
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
      <Row>
        <Col>
          <Card className='shadow' style={{ padding: '12px', marginTop: "20px", height: "320px" }}>    
              <AllPlayersEvolutionChart data={props.stats.adr} nicks={props.stats.nicks} title="ADR" xKeyName="round" />
          </Card>
        </Col>
        <Col>
          <Card className='shadow' style={{ padding: '12px', marginTop: "20px", height: "320px" }}>    
              <AllPlayersEvolutionChart data={props.stats.kda} nicks={props.stats.nicks} title="KDA" xKeyName="round" />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className='shadow' style={{ padding: '12px', marginTop: "20px", height: "320px" }}>    
              <AllPlayersEvolutionChart data={props.stats.hs} nicks={props.stats.nicks} title="Headshots" xKeyName="round" />
          </Card>
        </Col>
        <Col>
          <Card className='shadow' style={{ padding: '12px', marginTop: "20px", height: "320px" }}>    
              <AllPlayersEvolutionChart data={props.stats.ls} nicks={props.stats.nicks} title="Legshots" xKeyName="round" />
          </Card>
        </Col>
      </Row>
    </main>
    </Container> 
    </SSRProvider>   
  )
}
