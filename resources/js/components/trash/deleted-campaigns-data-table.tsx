import { Campaign, Pagination } from '@/types';
import { useForm } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Trash2, Undo2 } from 'lucide-react';
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
    },
    {
        accessorKey: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-3">
                    <RestoreCampaignButton campaignId={row.original.id} />
                    <DeleteCampaignButton campaignId={row.original.id} />
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

const DeleteCampaignButton = ({ campaignId }: { campaignId: number }) => {
    const { delete: destroy, processing } = useForm();

    return (
        <Button
            variant={'destructive'}
            size={'icon'}
            onClick={() => {
                destroy(route('trash.campaigns.hardDelete', campaignId));
            }}
            isLoading={processing}
        >
            <Trash2 />
        </Button>
    );
};

const RestoreCampaignButton = ({ campaignId }: { campaignId: number }) => {
    const { delete: patch, processing } = useForm();

    return (
        <Button
            variant={'ghost'}
            size={'icon'}
            onClick={() => {
                patch(route('trash.campaigns.restore', campaignId));
            }}
            isLoading={processing}
        >
            <Undo2 />
        </Button>
    );
};
