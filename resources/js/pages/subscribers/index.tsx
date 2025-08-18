import SubscriberDataTable from '@/components/subscribers/subscribers-data-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { BreadcrumbItem, EmailList, Pagination, Subscriber } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { isEmpty, isNull } from 'lodash';

const getDinamicBreadcrumbs = ({ emailListName, emailListId }: { emailListName: string; emailListId: number }) => {
    return [
        {
            title: 'Email List',
            href: '/email-list',
        },
        {
            title: emailListName,
            href: `/email-list/${emailListId}`,
        },
        {
            title: `Subscribers`,
            href: '`/email-list/${emailListId}/subscribers`',
        },
    ] as BreadcrumbItem[];
};

type LaravelPageProps = {
    emailList: EmailList;
    subscribersPaginated: Pagination<Subscriber>;
    search: string;
};

export default function Index() {
    const { props } = usePage<LaravelPageProps>();
    const { subscribersPaginated, search, emailList } = props;
    const breadCrumbs = getDinamicBreadcrumbs({ emailListName: emailList.title, emailListId: emailList.id });

    const subscribersIsEmpty = isEmpty(subscribersPaginated.data) && isNull(search);
    return (
        <AppLayout breadcrumbs={breadCrumbs}>
            <Head title="Subscribers" />
            <div className={cn('flex h-full flex-1 flex-col items-center gap-4 overflow-x-auto rounded-xl p-4')}>
                {subscribersIsEmpty ? (
                    <Link href={route('subscribers.create', emailList.id)}>
                        <Button>Create your first Subscriber</Button>
                    </Link>
                ) : (
                    <div className="flex w-full max-w-[1000px] flex-col gap-6">
                        <div className="flex justify-between max-sm:flex-col max-sm:gap-4">
                            <Link href={route('subscribers.create', emailList.id)}>
                                <Button className="max-sm:w-full">Create a new subscriber</Button>
                            </Link>
                            <form action={route('subscribers.index', emailList.id)}>
                                {/* [ ] Adicionar debounce e remover form */}
                                <Input name="search" placeholder="Search..." className="max-w-80" defaultValue={search} />
                            </form>
                        </div>
                        <SubscriberDataTable data={subscribersPaginated.data} links={subscribersPaginated?.links} />
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
