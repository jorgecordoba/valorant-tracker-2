import { Row, Col, Card, Image } from 'react-bootstrap'
import ProgressBar from 'react-bootstrap/ProgressBar';
var consts = require("../utils/constants")

const cldbase = consts.cloudinary(consts.transformations.none)

export function PlayerCard(props) {    
    return (
        <div style={{display:'flex', width: '100%', alignItems:"center", justifyContent: "center"}}>
        <Card className='shadow' style={{ padding: '7px', marginTop: "20px", height: "160px", width: "160px" }}>
            <Row>
            <div style={{display:'flex', width: '100%', alignItems:"center", justifyContent: "center", fontWeight: 'bolder'}}>{props.player.nick}</div>            
            </Row>            
            <Row>
                <Col fluid>
                <div style={{marginTop: '8px', display:'flex', width: '100%', height:"48px", alignItems:"center", justifyContent: "center"}}><Image src={`${cldbase}/ranks/rank_${props.player.current_tier}`} width="48px" fluid rounded/>           </div>    
                <div style={{marginTop: '8px', display: 'flex', width: '100%', alignItems:"center", justifyContent: "center"}}>
                    <ProgressBar now={props.player.current_raking} striped variant="success" style={{height:'6px', width: '60%'}}/>
                    <span style={{height:'6px', fontSize: '0.6em', marginLeft: '9px', marginTop: '-10px'}}>+{props.player.current_raking}</span></div>            
                </Col>                                                
            </Row>
            <Row>
            <div style={{marginTop: '9px', display:'flex', width: '100%', justifyContent: "space-around", fontSize: '0.8em', fontWeight: 'bold', fontStyle: 'italic'}}><span>KDA</span><span>ADR</span><span>Hs%</span></div>            
            </Row>                        
            <Row>
            <div style={{marginTop: '2px', display:'flex', width: '100%', justifyContent: "space-around", fontSize: '0.8em', fontStyle: 'italic'}}>
                <span>{parseFloat(props.player.stats.global.kda_ratio).toFixed(2)}</span>
                <span>{props.player.stats.global.adr}</span>
                <span>{props.player.stats.global.head_shots_pct}</span>
                </div>            
            </Row>                        
        </Card>
        </div>
    );
};