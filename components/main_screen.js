import { LatestMatchTable } from '../components/latest_match_table'
import { PlayerStats } from '../components/global_stats';
import { PlayerAccBar } from '../components/playeraccbar';
import { PlayerFkBar } from '../components/playerfkbar';
import { Row, Col, Card } from 'react-bootstrap'
import { Fragment } from 'react';

const MainScreen = (props) => {
    return (
        <Fragment>
            <Row>
                <Col>
                    <Card className='shadow' style={{ padding: '12px', marginTop: "20px", height: "600px" }}>
                        <LatestMatchTable data={props.matches}/>
                    </Card>
                </Col>
            </Row>
            <Row>           
                <Col xxl={7}>
                    <Row>
                        <Col>
                        <Card className='shadow' style={{ padding: '12px', marginTop: "20px", height: "320px" }}>                            
                            <PlayerAccBar players={props.playerStats}/>                                
                        </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card className='shadow' style={{ padding: '12px', marginTop: "20px", height: "320px" }}>                            
                                <PlayerFkBar players={props.playerStats}/>                                
                            </Card>
                        </Col>
                    </Row>
                </Col>  
                <Col xxl={5}>
                <Card style={{ padding: '12px', marginTop: "20px", height: "700px"}}>
                    <PlayerStats accounts={props.accountStats} players={props.playerStats} />
                </Card>              
                </Col>                      
            </Row>     
        </Fragment>
    )
}

export default MainScreen