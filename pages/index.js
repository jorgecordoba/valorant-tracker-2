import { Row, Col, Container, Tabs, Tab } from 'react-bootstrap'
import { LatestMatchTable } from '../components/latest_match_table'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  return (
    <Tabs>
      <Tab eventKey="main" title="Main Stats">
        <Container fluid>
          <Row>
            <Col><LatestMatchTable/></Col>
            <Col>Otra</Col>
          </Row>
          <Row>

          </Row>
        </Container>    
      </Tab>
    </Tabs>
  )
}
