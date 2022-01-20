import React, { useState } from 'react';
import { Row, Col, Container, Tabs, Tab, SSRProvider } from 'react-bootstrap'
import { FaBars } from 'react-icons/fa';
import SideBar from '../components/sidebar';
import PlayerGraphs from '../components/player_graphs';

import {getPerDayStats} from '../utils/queries'

export async function getStaticProps() {
    
  let perday = await getPerDayStats(null, null) 

  return {
    props: { perday }, 
    revalidate: 10 // will be passed to the page component as props
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
            <PlayerGraphs perday={props.perday} />                                
      </Col>
    </Row>
    </main>
    </Container> 
    </SSRProvider>   
  )
}
