import { LatestMatchTable } from '../components/latest_match_table'
import { PlayerStats } from '../components/global_stats';
import { PlayerAccBar } from '../components/playeraccbar';
import { PlayerFkBar } from '../components/playerfkbar';
import { Row, Col, Card } from 'react-bootstrap'
import { Fragment } from 'react';
import { PlayerStatBlock } from './player_stat_block';

const MainScreen = (props) => {
    return (
        <Fragment>            
            <Row>
                <Col>                    
                    <LatestMatchTable data={props.matches}/>                    
                </Col>
            </Row>
            <PlayerStatBlock accountStats={props.accountStats} />
            <Row>           
                <Col xxl={3}>
                    <Row>
                        <Col>
                        <Card className='shadow' style={{ padding: '12px', marginTop: "20px", height: "320px" }}>                            
                            <PlayerAccBar players={props.playerStats}/>                                
                        </Card>
                        </Col>
                    </Row>                    
                </Col>  
                <Col xxl={6}>
                <Card style={{ padding: '12px', marginTop: "20px", height: "700px"}}>
                    <PlayerStats accounts={props.accountStats} players={props.playerStats} />
                </Card>              
                </Col> 
                <Col xxl={3}>                    
                    <Row>
                        <Col>
                            <Card className='shadow' style={{ padding: '12px', marginTop: "20px", height: "320px" }}>                            
                                <PlayerFkBar players={props.playerStats}/>                                
                            </Card>
                        </Col>
                    </Row>
                </Col>                       
            </Row>     
        </Fragment>
    )
}

export default MainScreen