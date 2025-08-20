import DeletedEmailTemplateDataTable from '@/components/trash/deleted-email-template-data-table';
import { Input } from '@/components/ui/input';
import { TrashLayout } from '@/layouts/trash/trash-layout';
import { cn } from '@/lib/utils';
import { EmailTemplate, Pagination } from '@/types';
import { usePage } from '@inertiajs/react';
import { isNull } from 'lodash';
import { PackageOpen } from 'lucide-react';

type LaravelPageProps = {
    deletedEmailTemplatesPaginated: Pagination<EmailTemplate>;
    search: string;
};

export default function EmailTemplates() {
    const { props } = usePage<LaravelPageProps>();
    const { deletedEmailTemplatesPaginated, search } = props;

    const emailTemplatesIsEmpty = deletedEmailTemplatesPaginated.data.length === 0 && isNull(search);

    return (
        <TrashLayout>
            <div
                className={cn(
                    'flex h-full flex-1 flex-col items-center gap-4 overflow-x-auto rounded-xl p-4',
                    emailTemplatesIsEmpty && 'items-center justify-center',
                )}
            >
                {emailTemplatesIsEmpty ? (
                    <div className="flex flex-col items-center justify-center gap-4 opacity-60">
                        <PackageOpen className="size-20" />
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-2xl font-bold">No Email Templates on trash yet!</p>
                            <p className="text-[16px]">Restore Email Template should appear here.</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex w-full max-w-[1000px] flex-col gap-6">
                        <div className="flex w-full max-w-[1000px] flex-col gap-6">
                            <div className="flex justify-end max-sm:flex-col max-sm:gap-4">
                                <form action={route('trash.email-templates')}>
                                    {/*[ ] Adicionar debounce e remover form*/}
                                    <Input name="search" placeholder="Search..." className="max-w-80" defaultValue={search} />
                                </form>
                            </div>
                        </div>

                        <DeletedEmailTemplateDataTable data={deletedEmailTemplatesPaginated.data} links={deletedEmailTemplatesPaginated.links} />
                    </div>
                )}
            </div>
        </TrashLayout>
    );
}
