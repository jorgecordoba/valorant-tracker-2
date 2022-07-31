import React, { useState } from 'react';
import { Row, Col, Container, SSRProvider } from 'react-bootstrap'
import { FaBars } from 'react-icons/fa';
import SideBar from '../components/sidebar';
import MainScreen from '../components/main_screen';
import { ToastContainer } from 'react-toastify';

import {getMatches, getAccountStats, getPlayerStats} from '../utils/queries'

export async function getStaticProps(context) {
    
  let matches = await getMatches(null, null)  
  let accountStats = await getAccountStats(null, null)  
  let playerStats = await getPlayerStats(null, null)   

  return {
    props: { matches, accountStats, playerStats }, 
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
      <ToastContainer />
    <Container fluid className="app">
          <SideBar toggled={toggled} handleToggleSidebar={handleToggleSidebar}/>
      <main>
        <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
          <FaBars />
        </div>
      <Row>
        <Col>
          <MainScreen matches={props.matches} playerStats={props.playerStats} accountStats={props.accountStats} />
      </Col>
    </Row>
    </main>
    </Container> 
    </SSRProvider>   
  )
}
