import { Tabs, Tab } from 'react-bootstrap';
import { ByAccountStats } from './byaccount_table';
import { ByPlayerStats } from './byplayer_table';

export function PlayerStats(props) {
    return (
        <Tabs variant="dark" fill>            
            <Tab eventKey="By Account" title="By Account">
                <ByAccountStats accounts={props.accounts} />
            </Tab>
            <Tab eventKey="By Player" title="By Player" style={{backgroundColor:"black"}}>
                <ByPlayerStats players={props.players} />
            </Tab>
        </Tabs>
    );
};