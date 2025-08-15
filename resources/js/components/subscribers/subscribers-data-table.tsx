import { Pagination, Subscriber } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { PaginationComponent } from '../paginate-component';
import { DataTable } from '../table-component';

const columns: ColumnDef<Subscriber>[] = [
    {
        accessorKey: 'id',
        header: '#',
    },
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'actions',
        header: 'Actions',
    },
];

export default function SubscriberDataTable({ data, links }: { data: Subscriber[]; links: Pagination<unknown>['links'] }) {
    return (
        <div className="flex flex-col gap-6">
            <DataTable columns={columns} data={data} />
            <PaginationComponent links={links} />
        </div>
    );
}
