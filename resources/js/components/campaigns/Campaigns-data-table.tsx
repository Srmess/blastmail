import { Campaign, Pagination } from '@/types';
import { Link, useForm } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Trash2 } from 'lucide-react';
import { PaginationComponent } from '../paginate-component';
import { DataTable } from '../table-component';
import { Button } from '../ui/button';

const columns: ColumnDef<Campaign>[] = [
    {
        accessorKey: 'id',
        header: '#',
    },
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => {
            return <Link href={route('campaigns.dashboard', row.original.id)}>{row.getValue('name')}</Link>;
        },
    },
    {
        accessorKey: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-3">
                    {/* <Link href={route('subscribers.index', row.original.id)}>
                        <Button variant={'ghost'} size={'icon'}>
                            <ExternalLink />
                        </Button>
                    </Link> */}

                    <DeleteCampaignButton campaignId={row.original.id} />
                </div>
            );
        },
    },
];

export default function CampaignsDataTable({ data, links }: { data: Campaign[]; links: Pagination<unknown>['links'] }) {
    return (
        <div className="flex flex-col gap-6">
            <DataTable columns={columns} data={data} />
            <PaginationComponent links={links} />
        </div>
    );
}

const DeleteCampaignButton = ({ campaignId }: { campaignId: number }) => {
    const { delete: destroy, processing } = useForm();

    return (
        <Button
            variant={'destructive'}
            size={'icon'}
            onClick={() => {
                destroy(route('campaigns.destroy', campaignId));
            }}
            isLoading={processing}
        >
            <Trash2 />
        </Button>
    );
};
