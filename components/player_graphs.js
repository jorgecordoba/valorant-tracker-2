import { Fragment } from "react"
import { Row, Col,Card } from 'react-bootstrap'
import { AllPlayersEvolutionChart } from '../components/allplayers_evochart';

const PlayerGraphs = (props) => {
    return (
        <Fragment>
            <Row>
                <Col lg={6}>
                    <Card className='shadow' style={{ padding: '12px', marginTop: "20px", height: "400px"}}>
                        <AllPlayersEvolutionChart data={props.perday.elo} nicks={props.perday.nicks} title="Elo Evolution" />
                    </Card>
                </Col>            
                <Col lg={6}>
                    <Card className='shadow' style={{ padding: '12px', marginTop: "20px", height: "400px" }}>
                        <AllPlayersEvolutionChart data={props.perday.kda} nicks={props.perday.nicks} title="KDA Evolution" rollingWindow={1} />
                    </Card>
                </Col>
            </Row>  
            <Row>
                <Col lg={6}>
                    <Card className='shadow' style={{ padding: '12px', marginTop: "20px", height: "400px"}}>
                        <AllPlayersEvolutionChart data={props.perday.hs} nicks={props.perday.nicks} title="Headshot Evolution" rollingWindow={1} />
                    </Card>
                </Col>            
                <Col lg={6}>
                    <Card className='shadow' style={{ padding: '12px', marginTop: "20px", height: "400px" }}>
                        <AllPlayersEvolutionChart data={props.perday.adr} nicks={props.perday.nicks} title="ADR Evolution" rollingWindow={1} />
                    </Card>
              </Col>
            </Row>
        </Fragment>
    )
}

export default PlayerGraphs;