import { EmailTemplate, Pagination } from '@/types';
import { Link, useForm } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';
import { PaginationComponent } from '../paginate-component';
import { DataTable } from '../table-component';
import { Button } from '../ui/button';

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
        accessorKey: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-3">
                    <Link href={route('email-template.edit', row.original.id)}>
                        <Button variant={'ghost'} size={'icon'}>
                            <Pencil />
                        </Button>
                    </Link>

                    <DeleteEmailTemplateButton emailTemplateId={row.original.id} />
                </div>
            );
        },
    },
];

export default function EmailTemplateDataTable({ data, links }: { data: EmailTemplate[]; links: Pagination<unknown>['links'] }) {
    return (
        <div className="flex flex-col gap-6">
            <DataTable columns={columns} data={data} />
            <PaginationComponent links={links} />
        </div>
    );
}

const DeleteEmailTemplateButton = ({ emailTemplateId }: { emailTemplateId: number }) => {
    const { delete: destroy, processing } = useForm();

    return (
        <Button
            variant={'destructive'}
            size={'icon'}
            onClick={() => {
                destroy(route('email-template.destroy', emailTemplateId));
            }}
            isLoading={processing}
        >
            <Trash2 />
        </Button>
    );
};
