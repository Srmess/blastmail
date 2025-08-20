import { EmailList, Pagination } from '@/types';
import { Link, useForm } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ExternalLink, Trash2 } from 'lucide-react';
import { PaginationComponent } from '../paginate-component';
import { DataTable } from '../table-component';
import { Button } from '../ui/button';

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
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-3">
                    <Link href={route('subscribers.index', row.original.id)}>
                        <Button variant={'ghost'} size={'icon'}>
                            <ExternalLink />
                        </Button>
                    </Link>
                    <DeleteEmailListButton emailListId={row.original.id} />
                </div>
            );
        },
    },
];

export default function EmailListDataTable({ data, links }: { data: EmailList[]; links: Pagination<unknown>['links'] }) {
    return (
        <div className="flex flex-col gap-6">
            <DataTable columns={columns} data={data} />
            <PaginationComponent links={links} />
        </div>
    );
}

const DeleteEmailListButton = ({ emailListId }: { emailListId: number }) => {
    const { delete: destroy, processing } = useForm();

    return (
        <Button
            variant={'destructive'}
            size={'icon'}
            onClick={() => {
                destroy(route('email-list.destroy', emailListId));
            }}
            isLoading={processing}
        >
            <Trash2 />
        </Button>
    );
};
