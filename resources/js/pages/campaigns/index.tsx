import CampaignsDataTable from '@/components/campaigns/Campaigns-data-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { BreadcrumbItem, Campaign, Pagination } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { isNull } from 'lodash';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Campaigns',
        href: '/campaigns',
    },
];

type LaravelPageProps = {
    campaignsPaginated: Pagination<Campaign>;
    search: string;
};

export default function Index() {
    const { props } = usePage<LaravelPageProps>();
    const { campaignsPaginated, search } = props;

    const campaignsIsEmpty = campaignsPaginated?.data?.length === 0 && isNull(search);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Campaigns" />
            <div
                className={cn(
                    'flex h-full flex-1 flex-col items-center gap-4 overflow-x-auto rounded-xl p-4',
                    campaignsIsEmpty && 'items-center justify-center',
                )}
            >
                {campaignsIsEmpty ? (
                    <Link href={route('campaigns.create')}>
                        <Button>Create your first template</Button>
                    </Link>
                ) : (
                    <div className="flex w-full max-w-[1000px] flex-col gap-6">
                        <div className="flex justify-between max-sm:flex-col max-sm:gap-4">
                            <Link href={route('campaigns.create')}>
                                <Button className="max-sm:w-full">Create a new Campaign</Button>
                            </Link>
                            <form action={route('campaigns.index')}>
                                {/*[ ] Adicionar debounce e remover form*/}
                                <Input name="search" placeholder="Search..." className="max-w-80" defaultValue={search} />
                            </form>
                        </div>

                        <CampaignsDataTable data={campaignsPaginated?.data || []} links={campaignsPaginated?.links} />
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
