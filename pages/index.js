import React, { useState } from 'react';
import { Row, Col, Container, Tabs, Tab, SSRProvider, Card } from 'react-bootstrap'
import { AllPlayersEvolutionChart } from '../components/allplayers_evochart';
import { FaBars } from 'react-icons/fa';
import SideBar from '../components/sidebar';
import MainScreen from '../components/main_screen';
import PlayerGraphs from '../components/player_graphs';

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
  const [toggled, setToggled] = useState(false);

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  return (    
    <SSRProvider>
    <Container fluid className="app">
          <SideBar toggled={toggled} handleToggleSidebar={handleToggleSidebar}/>
      <main>
        <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
          <FaBars />
        </div>
      <Row>
        <Col>
          <Tabs>
            <Tab eventKey="main" title="Main Stats">        
              <MainScreen matches={props.matches} playerStats={props.playerStats} accountStats={props.accountStats} />
          </Tab>
          <Tab eventKey="graphs" title="Graphs">
              <PlayerGraphs perday={props.perday} />                                
          </Tab>
        </Tabs>
      </Col>
    </Row>
    </main>
    </Container> 
    </SSRProvider>   
  )
}
