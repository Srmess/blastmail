import DeletedCampaignsDataTable from '@/components/trash/deleted-campaigns-data-table';
import { Input } from '@/components/ui/input';
import { TrashLayout } from '@/layouts/trash/trash-layout';
import { cn } from '@/lib/utils';
import { Campaign, Pagination } from '@/types';
import { usePage } from '@inertiajs/react';
import { isNull } from 'lodash';
import { PackageOpen } from 'lucide-react';

type LaravelPageProps = {
    deletedCampaignsPaginated: Pagination<Campaign>;
    search: string;
};

export default function TrashedCapaigns() {
    const { props } = usePage<LaravelPageProps>();
    const { deletedCampaignsPaginated, search } = props;

    const campaignsIsEmpty = deletedCampaignsPaginated?.data?.length === 0 && isNull(search);

    return (
        <TrashLayout>
            <div
                className={cn(
                    'flex h-full flex-1 flex-col items-center gap-4 overflow-x-auto rounded-xl',
                    campaignsIsEmpty && 'items-center justify-center',
                )}
            >
                {campaignsIsEmpty ? (
                    <div className="flex flex-col items-center justify-center gap-4">
                        <PackageOpen className="size-20" />
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-2xl font-bold">No Campaigns deleted yet!</p>
                            <p className="text-[16px]">Restore campaigns should appear here.</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex w-full max-w-[1000px] flex-col gap-6">
                        <div className="flex justify-end max-sm:flex-col max-sm:gap-4">
                            <form action={route('trash.campaigns')}>
                                {/*[ ] Adicionar debounce e remover form*/}
                                <Input name="search" placeholder="Search..." className="max-w-80" defaultValue={search} />
                            </form>
                        </div>

                        <DeletedCampaignsDataTable data={deletedCampaignsPaginated?.data || []} links={deletedCampaignsPaginated.links} />
                    </div>
                )}
            </div>
        </TrashLayout>
    );
}
