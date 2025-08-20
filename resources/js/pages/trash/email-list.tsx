import DeletedEmailListDataTable from '@/components/trash/deleted-email-list-data-table';
import { Input } from '@/components/ui/input';
import { TrashLayout } from '@/layouts/trash/trash-layout';
import { cn } from '@/lib/utils';
import { EmailList, Pagination } from '@/types';
import { usePage } from '@inertiajs/react';
import { isNull } from 'lodash';
import { PackageOpen } from 'lucide-react';

type LaravelPageProps = {
    deletedEmailListsPaginated: Pagination<EmailList>;
    search: string;
};

export default function EmailLists() {
    const { props } = usePage<LaravelPageProps>();
    const { deletedEmailListsPaginated, search } = props;

    const emailListIsEmpty = deletedEmailListsPaginated.data.length === 0 && isNull(search);

    return (
        <TrashLayout>
            <div
                className={cn(
                    'flex h-full flex-1 flex-col items-center gap-4 overflow-x-auto rounded-xl p-4',
                    emailListIsEmpty && 'items-center justify-center',
                )}
            >
                {emailListIsEmpty ? (
                    <div className="flex flex-col items-center justify-center gap-4">
                        <PackageOpen className="size-20" />
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-2xl font-bold">No Email Lists deleted yet!</p>
                            <p className="text-[16px]">Restore Email List should appear here.</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex w-full max-w-[1000px] flex-col gap-6">
                        <div className="flex w-full max-w-[1000px] flex-col gap-6">
                            <div className="flex justify-end max-sm:flex-col max-sm:gap-4">
                                <form action={route('trash.email-lists')}>
                                    {/*[ ] Adicionar debounce e remover form*/}
                                    <Input name="search" placeholder="Search..." className="max-w-80" defaultValue={search} />
                                </form>
                            </div>
                        </div>
                        <DeletedEmailListDataTable data={deletedEmailListsPaginated.data} links={deletedEmailListsPaginated?.links} />
                    </div>
                )}
            </div>
        </TrashLayout>
    );
}
