import { PaginationComponent } from '@/components/paginate-component';
import { DataTable } from '@/components/table-component';
import { Input } from '@/components/ui/input';
import { Campaign, CampaignMail, Pagination } from '@/types';
import { usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { TabContentLayout } from '../show-tab-list';

const columns: ColumnDef<CampaignMail>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => {
            return row.original.subscriber.name;
        },
    },
    {
        accessorKey: 'email',
        header: 'Email',
        cell: ({ row }) => {
            return row.original.subscriber.email;
        },
    },
    {
        accessorKey: 'openings',
        header: 'Openings',
    },
];

type LaravelPageProps = {
    campaign: Campaign;
    query: Pagination<CampaignMail>;
    search: string;
};

export const OpenTabContent = () => {
    const { props } = usePage<LaravelPageProps>();
    const { search, campaign, query } = props;

    return (
        <TabContentLayout tab="open">
            <form action={route('campaigns.dashboard', [campaign.id, 'open'])} className="flex justify-end">
                {/*[ ] Adicionar debounce e remover form*/}
                <Input name="search" placeholder="Search..." className="max-w-80" defaultValue={search} />
            </form>
            <div className="flex flex-col gap-6">
                <DataTable columns={columns} data={query.data} />
                <PaginationComponent links={query.links} />
            </div>
        </TabContentLayout>
    );
};
