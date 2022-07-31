import { Fragment } from "react";
import { PlayerCard } from "./player_card";
import {Row, Col, Card} from "react-bootstrap"

export function PlayerStatBlock(props) {
    props.accountStats.sort((a,b) => (b.current_tier*100 + b.current_raking) - (a.current_tier * 100 + a.current_raking))
    return (
    <Fragment>
        <Card className='shadow' style={{ padding: '12px', paddingTop: '2px'}}>                 
            <Row>{
                props.accountStats.map( p => {
                    return (                        
                        <Col key={p.nick}><PlayerCard player={p}></PlayerCard></Col>                                              
                    )
                })}
            </Row>
        </Card>  
    </Fragment>
    );
};