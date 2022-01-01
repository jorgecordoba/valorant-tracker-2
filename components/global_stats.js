import DataTable from 'react-data-table-component';
import { Image, Tabs, Tab } from 'react-bootstrap';

const columns = [
    {
        id: 'Rank',
        name: 'Rank',
        minWidth: "40px",
        selector: row => row.current_tier,
        cell: row => <Image src={`/resources/ranks/${row.current_tier}.png`} width="32px" fluid rounded/>,
        sortable: true
    },
    {
        id: 'Name',
        name: 'Name',
        selector: row => row.nick,
        sortable: true
    },
    {
        id: 'KDA',
        name: 'KDA',
        selector: row => parseFloat(row.stats.global.kda_ratio).toFixed(2),
        sortable: true
    },
    {
        id: 'ADR',
        name: 'ADR',
        selector: row => parseFloat(row.stats.global.adr),
        sortable:true
    },
    {
        id: 'POS',
        name: 'POS',
        selector: row => parseFloat(row.stats.global.avg_position).toFixed(2),
        sortable:true
    }
]

export function PlayerStats(props) {
    return (
        <Tabs variant="dark" fill>
            <Tab eventKey="By Player" title="By Player" style={{backgroundColor:"black"}}>

            </Tab>
            <Tab eventKey="By Account" title="By Account">
                <DataTable
                    columns={columns}
                    data={props.players}
                    responsive
                    defaultSortFieldId={'Rank'}
                    defaultSortAsc={false}
                    theme="dark"
                />
            </Tab>
        </Tabs>
    );
};