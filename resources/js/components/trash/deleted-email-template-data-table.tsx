import { EmailTemplate, Pagination } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { PaginationComponent } from '../paginate-component';
import { DataTable } from '../table-component';
import { DeleteEntityButton, RestoreEntityButton } from './action-table-buttons';

const columns: ColumnDef<EmailTemplate>[] = [
    {
        accessorKey: 'id',
        header: '#',
    },
    {
        accessorKey: 'title',
        header: 'Name',
    },
    {
        accessorKey: 'deleted_at',
        header: 'Deleted At',
        cell: ({ row }) => {
            const deletedAt = row.original?.deleted_at;
            return deletedAt ? new Date(deletedAt).toLocaleDateString() : 'Not Deleted';
        },
    },
    {
        accessorKey: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-3">
                    <RestoreEntityButton entityId={row.original.id} restoreRoute="trash.email-templates.restore" />
                    <DeleteEntityButton entityId={row.original.id} deleteRoute="trash.email-templates.hardDelete" />
                </div>
            );
        },
    },
];

export default function DeletedEmailTemplateDataTable({ data, links }: { data: EmailTemplate[]; links: Pagination<unknown>['links'] }) {
    return (
        <div className="flex flex-col gap-6">
            <DataTable columns={columns} data={data} />
            <PaginationComponent links={links} />
        </div>
    );
}
