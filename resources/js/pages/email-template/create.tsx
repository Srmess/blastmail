import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { ManageEmailTemplateInfer } from '@/schemas/email-template';
import { BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Templates',
        href: '/email-template',
    },
    {
        title: 'Create new Email Template',
        href: '/email-template/create',
    },
];

export default function Create() {
    const { post, errors, setData, data, reset, processing } = useForm<ManageEmailTemplateInfer>({
        title: '',
        body: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('email-template.store'), {
            onSuccess: () => {
                toast.success('Template created successfully!');
                reset();
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create new Email List" />
            <div className="flex h-full w-full items-center justify-center">
                <form method="POST" className="flex w-full max-w-[500px] flex-col gap-6" onSubmit={submit}>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Name</Label>
                            <Input
                                id="title"
                                autoFocus
                                autoComplete="title"
                                placeholder="Type here"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                disabled={processing}
                            />
                            <InputError message={errors.title} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="body">body</Label>
                            <Input
                                id="body"
                                autoComplete="body"
                                placeholder="Type here"
                                value={data.body}
                                onChange={(e) => setData('body', e.target.value)}
                                disabled={processing}
                            />
                            <InputError message={errors.body} />
                        </div>

                        <div className="flex items-center gap-4">
                            <Link href={route('email-template.index')} className="w-full">
                                <Button variant={'ghost'} type="button" className="w-full">
                                    Cancel
                                </Button>
                            </Link>
                            <Button type="submit" className="w-full">
                                Create
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
