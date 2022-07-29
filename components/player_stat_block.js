import { Fragment } from "react";
import { PlayerCard } from "./player_card";
import {Row, Col, Card} from "react-bootstrap"

export function PlayerStatBlock(props) {
    props.accountStats.sort((a,b) => (b.current_tier*100 + b.current_raking) - (a.current_tier * 100 + a.current_raking))
    console.log(props.accountStats)
    return (
       <Fragment>
        <Card className='shadow' style={{ padding: '12px'}}>            
            <Row>
                <Col><PlayerCard player={props.accountStats[0]}></PlayerCard></Col>
                <Col><PlayerCard player={props.accountStats[1]}></PlayerCard></Col>
                <Col><PlayerCard player={props.accountStats[2]}></PlayerCard></Col>
                <Col><PlayerCard player={props.accountStats[3]}></PlayerCard></Col>
                <Col><PlayerCard player={props.accountStats[4]}></PlayerCard></Col>
                <Col><PlayerCard player={props.accountStats[5]}></PlayerCard></Col>                
            </Row>
        </Card>            
       </Fragment> 
    );
};