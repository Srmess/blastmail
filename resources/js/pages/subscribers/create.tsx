import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { ManageSubscriberInfer } from '@/schemas/subscriber';
import { BreadcrumbItem, EmailList } from '@/types';
import { Inertia } from '@inertiajs/inertia';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

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
            href: `/email-list/${emailListId}/subscribers`,
        },
        {
            title: `Create`,
            href: `/email-list/${emailListId}/subscribers/create`,
        },
    ] as BreadcrumbItem[];
};

type LaravelPageProps = {
    emailList: EmailList;
};

export default function Create() {
    const { props } = usePage<LaravelPageProps>();
    const { emailList } = props;
    const breadCrumbs = getDinamicBreadcrumbs({ emailListName: emailList.title, emailListId: emailList.id });

    const { post, errors, setData, data, reset, processing } = useForm<ManageSubscriberInfer>({
        email: '',
        name: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('subscribers.create', emailList.id), {
            onSuccess: () => {
                toast.success('Subscriber created successfully!');
                reset();
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadCrumbs}>
            <Head title="Create new Email List" />
            <div className="flex h-full w-full items-center justify-center">
                <form method="POST" className="flex w-full max-w-[500px] flex-col gap-6" onSubmit={submit}>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                autoFocus
                                autoComplete="name"
                                placeholder="Type here"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                disabled={processing}
                            />
                            <InputError message={errors.name} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                autoComplete="email"
                                placeholder="Type here"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                disabled={processing}
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="flex items-center gap-4">
                            <Button
                                variant={'ghost'}
                                type="button"
                                className="mt-4 w-full"
                                tabIndex={4}
                                onClick={() => {
                                    Inertia.get(route('subscribers.index'));
                                }}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" className="mt-4 w-full" tabIndex={4}>
                                Create
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
