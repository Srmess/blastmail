import { Pagination, Subscriber } from '@/types';
import { useForm } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Trash2 } from 'lucide-react';
import { PaginationComponent } from '../paginate-component';
import { DataTable } from '../table-component';
import { Button } from '../ui/button';

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
        cell: ({ row }) => {
            return <DeleteSubscriberButton emailListId={row.original.email_list?.id || 0} subscriberId={row.original.id} />;
        },
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

const DeleteSubscriberButton = ({ emailListId, subscriberId }: { emailListId: number; subscriberId: number }) => {
    const { delete: destroy } = useForm();

    return (
        <Button
            variant={'destructive'}
            size={'icon'}
            onClick={() => {
                destroy(route('subscribers.destroy', [`${emailListId}`, `${subscriberId}`]));
            }}
        >
            <Trash2 />
        </Button>
    );
};
