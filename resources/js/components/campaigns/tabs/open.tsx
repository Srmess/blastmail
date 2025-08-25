import { PaginationComponent } from '@/components/paginate-component';
import { DataTable } from '@/components/table-component';
import { Input } from '@/components/ui/input';
import { Campaign, Subscriber } from '@/types';
import { usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { TabContentLayout } from '../show-tab-list';

const columns: ColumnDef<Subscriber & { openings: string }>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'openings',
        header: 'Openings',
    },
];

type LaravelPageProps = {
    campaign: Campaign;
    search: string;
};

export const OpenTabContent = () => {
    const { props } = usePage<LaravelPageProps>();
    const { search, campaign } = props;

    return (
        <TabContentLayout tab="open">
            <form action={route('campaigns.dashboard', [campaign.id, 'open'])} className="flex justify-end">
                {/*[ ] Adicionar debounce e remover form*/}
                <Input name="search" placeholder="Search..." className="max-w-80" defaultValue={search} />
            </form>
            <div className="flex flex-col gap-6">
                <DataTable columns={columns} data={[{ id: 1, name: 'Marcos Vinícius', email: 'teste@teste.com', openings: '40' }]} />
                <PaginationComponent links={[]} />
            </div>
        </TabContentLayout>
    );
};
