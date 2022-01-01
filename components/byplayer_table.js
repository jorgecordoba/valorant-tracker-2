import DataTable from 'react-data-table-component';

const columns = [
    {
        id: 'Name',
        name: 'Name',
        selector: row => row.name,
        sortable: true
    },
    {
        id: 'KDA',
        name: 'KDA',
        selector: row => parseFloat(row.global.kda_ratio).toFixed(2),
        sortable: true
    },
    {
        id: 'ADR',
        name: 'ADR',
        selector: row => parseFloat(row.global.adr),
        sortable:true
    },
    {
        id: 'POS',
        name: 'POS',
        selector: row => parseFloat(row.global.avg_position).toFixed(2),
        sortable:true
    }
]

export function ByPlayerStats(props) {
    return (
        <DataTable
                    columns={columns}
                    data={props.players}
                    responsive
                    defaultSortFieldId={'POS'}
                    defaultSortAsc={false}
                    theme="dark"
        />
    );
};