import { Row, Col, Container, Tabs, Tab, SSRProvider, Card } from 'react-bootstrap'
import { LatestMatchTable } from '../components/latest_match_table'
import { PlayerStats } from '../components/global_stats';
import 'bootstrap/dist/css/bootstrap.min.css';
const axios = require('axios');

async function getMatches() {
  try {
      const response = await axios.get("http://vanaheim.hopto.org:4000/matches");
      return response.data   
  }
  catch (error) {
      console.log("There is an error " + error)
  }
}

async function getPlayerStats() {
  try {
    let players = await axios.get("http://vanaheim.hopto.org:4000/player");
    let player_data = []

    for (const item of players.data) {
      let entry = await axios.get(`http://vanaheim.hopto.org:4000/player/${item.puuid}`)
      let stats = await axios.get(`http://vanaheim.hopto.org:4000/player/${item.puuid}/stats`)
      entry.data.stats = stats.data
      player_data.push(entry.data)
    }
    return player_data
  }
  catch (error) {
    console.log("There's an error " + error)
  }
}

function computePlayerStatsFromAccountStats(playerStats) {
  let acc = {}
  for (const item in playerStats) {
    if (!acc[item.name]) {
      acc[item.name] = {

      }
    }
  }
}

export async function getServerSideProps(context) {
  
  let matches = await getMatches()
  let playerStats = await getPlayerStats()

  return {
    props: { matches, playerStats }, // will be passed to the page component as props
  }
}

export default function Home(props) {

  return (
    <SSRProvider>
    <Tabs>
      <Tab eventKey="main" title="Main Stats">
        <Container fluid>
          <Row>           
            <Col sm={7}><Card style={{ padding: '12px', marginTop: "20px" }}><LatestMatchTable data={props.matches}/></Card></Col>            
            <Col sm={5}><Card style={{ padding: '12px', marginTop: "20px" }}><PlayerStats players={props.playerStats} /></Card></Col>
          </Row>
          <Row>
            <Col><Card style={{ padding: '12px', marginTop: "20px" }}></Card></Col>
            <Col><Card style={{ padding: '12px', marginTop: "20px" }}></Card></Col>
          </Row>
        </Container>    
      </Tab>
    </Tabs>
    </SSRProvider>
  )
}
