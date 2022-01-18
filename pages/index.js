import { Row, Col, Container, Tabs, Tab, SSRProvider, Card } from 'react-bootstrap'
import { LatestMatchTable } from '../components/latest_match_table'
import { PlayerStats } from '../components/global_stats';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PlayerAccBar } from '../components/playeraccbar';
import { PlayerFkBar } from '../components/playerfkbar';
import { AllPlayersEvolutionChart } from '../components/allplayers_evochart';
const axios = require('axios');

function composeDateQuery(from, to) {
  let fromQuery = ""
  let toQuery = ""      
  if (from) {
    fromQuery = `from=${from}`
  }
  if (to) {
    toQuery = `to=${to}`
  }

  let queryString = ""
  if (from && to) {
    queryString = `?${fromQuery}&${toQuery}`
  } 
  else if (from || to) {
    queryString = `?${fromQuery}${toQuery}`
  }  
  return queryString
}

async function getMatches(from, to) {
  try {      
      const url = `http://despechis.com:4000/matches${composeDateQuery(from, to)}`      
      const response = await axios.get(url);      
      return response.data   
  }
  catch (error) {
      console.log("There is an error " + error)
  }
}

async function getAccountStats(from, to) {
  try {    

    let players = await axios.get(`http://despechis.com:4000/player${composeDateQuery(from, to)}`);
    let player_data = []

    for (const item of players.data) {
      let entry = await axios.get(`http://despechis.com:4000/account/${item.puuid}${composeDateQuery(from, to)}`)
      let stats = await axios.get(`http://despechis.com:4000/account/${item.puuid}/stats${composeDateQuery(from, to)}`)
      entry.data.stats = stats.data
      player_data.push(entry.data)
    }    
    return player_data
  }
  catch (error) {
    console.log("There's an error " + error)
  }
}

async function getPlayerStats(from, to) {
  try {
    let players = await axios.get(`http://despechis.com:4000/player${composeDateQuery(from, to)}`);
    let player_data = []

    let data = players.data

    data = data.filter((v,i,a)=>a.findIndex(t=>(t.name===v.name))===i)

    for (const item of data) {      
      let stats = await axios.get(`http://despechis.com:4000/player/${item.name}/stats${composeDateQuery(from, to)}`)      
      stats.data.name = item.name
      player_data.push(stats.data)
    }
    return player_data
  }
  catch (error) {
    console.log("There's an error " + error)
  }
}

async function getPerDayStats(from, to) {
  try {
    let perday = await axios.get(`http://despechis.com:4000/account/perday${composeDateQuery(from, to)}`);        
    
    return perday.data
  }
  catch (error) {
    console.log("There's an error " + error)
  }
}

export async function getServerSideProps(context) {
    
  let matches = await getMatches(context.query.from, context.query.to)  
  let accountStats = await getAccountStats(context.query.from, context.query.to)  
  let playerStats = await getPlayerStats(context.query.from, context.query.to)   
  let perday = await getPerDayStats(context.query.from, context.query.to) 

  return {
    props: { matches, accountStats, playerStats, perday }, // will be passed to the page component as props
  }
}

export default function Home(props) {

  return (    
    <SSRProvider>
    <Container fluid>
      <Row><Col><div style={{display:'flex', justifyContent:'center', alignItems: 'center', marginTop: '10px'}}><h3>Valorant Tracker</h3></div> </Col></Row>
      <Row>
        <Col>
          <Tabs>
            <Tab eventKey="main" title="Main Stats">        
              <Row>           
                <Col lg={7}>
                  <Row>
                    <Col>
                      <Card style={{ padding: '12px', marginTop: "20px", height: "360px" }}>
                        <LatestMatchTable data={props.matches}/>
                      </Card>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Card style={{ padding: '12px', marginTop: "20px", height: "320px" }}>                            
                        <PlayerAccBar players={props.playerStats}/>                                
                      </Card>
                    </Col>
                    <Col>
                      <Card style={{ padding: '12px', marginTop: "20px", height: "320px" }}>                            
                        <PlayerFkBar players={props.playerStats}/>                                
                      </Card>
                    </Col>
                  </Row>
                </Col>  
                <Col lg={5}>
                  <Card style={{ padding: '12px', marginTop: "20px", height: "700px"}}>
                    <PlayerStats accounts={props.accountStats} players={props.playerStats} />
                  </Card>              
                </Col>                      
              </Row>                                                        
          </Tab>
          <Tab eventKey="graphs" title="Graphs">
            <Row>
            <Col lg={6}>
                <Card style={{ padding: '12px', marginTop: "20px", height: "400px"}}>
                  <AllPlayersEvolutionChart data={props.perday.elo} nicks={props.perday.nicks} title="Elo Evolution" />
                </Card>
              </Col>            
              <Col lg={6}>
                <Card style={{ padding: '12px', marginTop: "20px" }}>
                <AllPlayersEvolutionChart data={props.perday.kda} nicks={props.perday.nicks} title="KDA Evolution" rollingWindow={1} />
                </Card>
              </Col>
            </Row>  
            <Row>
            <Col lg={6}>
                <Card style={{ padding: '12px', marginTop: "20px", height: "400px"}}>
                  <AllPlayersEvolutionChart data={props.perday.hs} nicks={props.perday.nicks} title="Headshot Evolution" rollingWindow={1} />
                </Card>
              </Col>            
              <Col lg={6}>
                <Card style={{ padding: '12px', marginTop: "20px" }}>
                <AllPlayersEvolutionChart data={props.perday.adr} nicks={props.perday.nicks} title="ADR Evolution" rollingWindow={1} />
                </Card>
              </Col>
            </Row>                                  
          </Tab>
        </Tabs>
      </Col>
    </Row>
    </Container> 
    </SSRProvider>   
  )
}
