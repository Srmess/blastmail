import { Campaign, Pagination } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { PaginationComponent } from '../paginate-component';
import { DataTable } from '../table-component';
import { DeleteEntityButton, RestoreEntityButton } from './action-table-buttons';

const columns: ColumnDef<Campaign>[] = [
    {
        accessorKey: 'id',
        header: '#',
    },
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-3">
                    <RestoreEntityButton entityId={row.original.id} restoreRoute="trash.campaigns.restore" />
                    <DeleteEntityButton entityId={row.original.id} deleteRoute="trash.campaigns.hardDelete" />
                </div>
            );
        },
    },
];

export default function DeletedCampaignsDataTable({ data, links }: { data: Campaign[]; links: Pagination<unknown>['links'] }) {
    return (
        <div className="flex flex-col gap-6">
            <DataTable columns={columns} data={data} />
            <PaginationComponent links={links} />
        </div>
    );
}
