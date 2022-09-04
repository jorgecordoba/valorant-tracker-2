import { Row, Col, Card, Image } from 'react-bootstrap'
import ProgressBar from 'react-bootstrap/ProgressBar';
var consts = require("../utils/constants")
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { BoxArrowUpRight} from 'react-bootstrap-icons';

const cldbase = consts.cloudinary(consts.transformations.none)

export function PlayerCard(props) {                

    useEffect(() => {        
        // Retreive previous values for this element
        let saved = localStorage.getItem(props.player.nick)
        if (saved) {
            let originalPlayer = JSON.parse(saved)
            if (originalPlayer.current_tier < props.player.current_tier) {
                toast.success(`${props.player.nick} went up from ${originalPlayer.current_tier_name} to ${props.player.current_tier_name}`, {toastId: props.player.nick, position: "top-center",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,}) 
            }
            else if (originalPlayer.current_tier > props.player.current_tier) {
                toast.error(`${props.player.nick} went down from ${originalPlayer.current_tier_name} to ${props.player.current_tier_name}`, {toastId: props.player.nick, position: "top-center",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,})
            }
            else if (originalPlayer.current_raking < props.player.current_raking) {
                toast.success(`${props.player.nick} improved his progress on ${props.player.current_tier_name} from ${originalPlayer.current_raking} to ${props.player.current_raking}`, {toastId: props.player.nick, position: "top-center",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,})                
            }
            else if (originalPlayer.current_raking > props.player.current_raking) {
                toast.error(`${props.player.nick} decreased his progress on ${props.player.current_tier_name} from ${originalPlayer.current_raking} to ${props.player.current_raking}`, {toastId: props.player.nick, position: "top-center",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,})                
            }
        }        
        
        localStorage.setItem(props.player.nick, JSON.stringify(props.player))        
      }, []); // <-- empty array means 'run once'

    return (        
        <a href={`https://tracker.gg/valorant/profile/riot/${props.player.current_nick}%23${props.player.current_tag}/overview`} target="_blank" rel="noreferrer">
        <div style={{display:'flex', width: '100%', alignItems:"center", justifyContent: "center"}}>        
        <Card className='shadow' style={{ padding: '7px', marginTop: "20px", height: "180px", width: "126px" }}>
            <Row>
            <div style={{display:'flex', width: '100%', alignItems:"center", justifyContent: "center", fontWeight: 'bolder', fontSize: '0.9em'}}>{props.player.nick} </div>            
            <div style={{display:'flex', width: '100%', alignItems:"center", justifyContent: "center", fontWeight: 'bolder', fontSize: '0.7em'}}>({props.player.name}) </div>            
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
            {/* 
            <Row><div style={{marginTop: '2px', display:'flex', width: '100%', justifyContent: "space-around", fontSize: '0.8em', fontStyle: 'italic'}} title={props.player.stats.player.mmr.toFixed(2)}><b style={{marginTop: "5px"}}>MMR</b><Image src={`${cldbase}/ranks/rank_${Math.round(props.player.stats.player.mmr/100)}`} style={{width: "32px", height:"32px"}} fluid rounded/></div></Row>            
            */}
        </Card>
        </div>
        </a>
    );
};