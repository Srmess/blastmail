import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { BreadcrumbItem, EmailList, Pagination } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Email List',
        href: '/email-list',
    },
];

export default function Index({ emailListsPaginated }: { emailListsPaginated: Pagination<EmailList> }) {
    const { data } = emailListsPaginated;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Email List" />
            <div
                className={cn('flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4', data.length === 0 && 'items-center justify-center')}
            >
                {data.length === 0 ? (
                    <Link href={route('email-list.create')}>
                        <Button>Create your first email list</Button>
                    </Link>
                ) : (
                    <>LISTAR LISTAS DE EMAIL</>
                )}
            </div>
        </AppLayout>
    );
}
