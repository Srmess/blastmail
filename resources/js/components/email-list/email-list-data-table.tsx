import { EmailList, Pagination } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { PaginationComponent } from '../paginate-component';
import { DataTable } from '../table-component';

const columns: ColumnDef<EmailList>[] = [
    {
        accessorKey: 'id',
        header: '#',
    },
    {
        accessorKey: 'title',
        header: 'Name',
    },
    {
        accessorKey: 'subscribers_count',
        header: 'Subscribers',
    },
    {
        accessorKey: 'actions',
        header: 'Actions',
    },
];

export default function EmailListDataTable({ data, links }: { data: EmailList[]; links: Pagination<unknown>['links'] }) {
    return (
        <div>
            <DataTable columns={columns} data={data} />
            <PaginationComponent links={links} />
        </div>
    );
}
