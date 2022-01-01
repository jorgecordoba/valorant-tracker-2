import DataTable from 'react-data-table-component';
import { Image, Tabs, Tab } from 'react-bootstrap';

const columns = [
    {
        id: 'Rank',
        name: 'Rank',
        minWidth: "40px",
        cell: row => <Image src={`/resources/ranks/${row.current_tier}.png`} width="32px" fluid rounded/>
    },
    {
        id: 'Name',
        name: 'Name',
        selector: row => row.nick
    },
    {
        id: 'KDA',
        name: 'KDA',
        selector: row => parseFloat(row.stats.global.kda_ratio).toFixed(2)
    },
    {
        id: 'POS',
        name: 'POS',
        selector: row => parseFloat(row.stats.global.avg_position).toFixed(2)
    }
]

export function PlayerStats(props) {
    return (
        <Tabs fill>
            <Tab eventKey="By Player" title="By Player">

            </Tab>
            <Tab eventKey="By Account" title="By Account">
                <DataTable
                    columns={columns}
                    data={props.players}
                    responsive
                    defaultSortFieldId={'Pos'}
                    theme="dark"
                />
            </Tab>
        </Tabs>
    );
};