import EmailTemplateDataTable from '@/components/email-template/email-template-data-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { BreadcrumbItem, EmailList, Pagination } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { isNull } from 'lodash';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Templates',
        href: '/email-template',
    },
];

type LaravelPageProps = {
    emailTemplatesPaginated: Pagination<EmailList>;
    search: string;
};

export default function Index() {
    const { props } = usePage<LaravelPageProps>();
    const { emailTemplatesPaginated, search } = props;

    const emailTemplatesIsEmpty = emailTemplatesPaginated.data.length === 0 && isNull(search);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Email List" />
            <div
                className={cn(
                    'flex h-full flex-1 flex-col items-center gap-4 overflow-x-auto rounded-xl p-4',
                    emailTemplatesIsEmpty && 'items-center justify-center',
                )}
            >
                {emailTemplatesIsEmpty ? (
                    <Link href={route('email-template.create')}>
                        <Button>Create your first template</Button>
                    </Link>
                ) : (
                    <div className="flex w-full max-w-[1000px] flex-col gap-6">
                        <div className="flex justify-between max-sm:flex-col max-sm:gap-4">
                            <Link href={route('email-template.create')}>
                                <Button className="max-sm:w-full">Create a new template</Button>
                            </Link>
                            <form action={route('email-template.index')}>
                                {/*[ ] Adicionar debounce e remover form*/}
                                <Input name="search" placeholder="Search..." className="max-w-80" defaultValue={search} />
                            </form>
                        </div>

                        <EmailTemplateDataTable data={emailTemplatesPaginated.data} links={emailTemplatesPaginated.links} />
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
