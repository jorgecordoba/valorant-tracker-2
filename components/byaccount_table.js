import DataTable from 'react-data-table-component';
import { Image } from 'react-bootstrap';

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

export function ByAccountStats(props) {
    return (
        <DataTable
                    columns={columns}
                    data={props.accounts}
                    responsive
                    defaultSortFieldId={'RANK'}
                    defaultSortAsc={false}
                    theme="dark"
        />
    );
};