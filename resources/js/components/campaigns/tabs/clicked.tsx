import { PaginationComponent } from '@/components/paginate-component';
import { DataTable } from '@/components/table-component';
import { Input } from '@/components/ui/input';
import { Campaign, Subscriber } from '@/types';
import { usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { TabContentLayout } from '../show-tab-list';

const columns: ColumnDef<Subscriber & { clicks: string }>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'clicks',
        header: 'Clicks',
    },
];

type LaravelPageProps = {
    campaign: Campaign;
    search: string;
};

export const ClickedTabContent = () => {
    const { props } = usePage<LaravelPageProps>();
    const { search, campaign } = props;

    return (
        <TabContentLayout tab="clicked">
            <form action={route('campaigns.dashboard', [campaign.id, 'clicked'])} className="flex justify-end">
                {/*[ ] Adicionar debounce e remover form*/}
                <Input name="search" placeholder="Search..." className="max-w-80" defaultValue={search} />
            </form>
            <div className="flex flex-col gap-6">
                <DataTable columns={columns} data={[{ id: 1, name: 'Marcos Vinícius', email: 'teste@teste.com', clicks: '40' }]} />
                <PaginationComponent links={[]} />
            </div>
        </TabContentLayout>
    );
};
