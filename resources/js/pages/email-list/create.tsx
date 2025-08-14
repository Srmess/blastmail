import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { ManageEmailListInfer, ManageEmailListSchema } from '@/schemas/email-list';
import { BreadcrumbItem } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Email List',
        href: '/email-list',
    },
    {
        title: 'Create new Email List',
        href: '/email-list/create',
    },
];

export default function Create() {
    const { register, reset, formState, handleSubmit } = useForm<ManageEmailListInfer>({
        resolver: zodResolver(ManageEmailListSchema),
        defaultValues: {
            title: '',
        },
    });

    const submit = (data: ManageEmailListInfer) => {
        const payload = {
            ...data,
            subscribersFile: data.subscribersFile[0],
        };

        Inertia.post(route('email-list.store'), payload, {
            onError: (error) => {
                alert('erro');
                console.log(error);
            },
            onSuccess: (response) => {
                console.log(response);
                toast.success('Email link created!');
            },
            onFinish: () => {
                reset();
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create new Email List" />
            <div className="flex h-full w-full items-center justify-center">
                <form method="POST" className="flex w-full max-w-[500px] flex-col gap-6" onSubmit={handleSubmit(submit)} encType="multpart/form-data">
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Name</Label>
                            <Input id="title" type="title" autoFocus autoComplete="title" placeholder="Type here" {...register('title')} />
                            <InputError message={formState.errors.title?.message} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="subscribersFile">Subscribers List File</Label>
                            <Input id="subscribersFile" type="file" placeholder="Type here" accept=".csv" {...register('subscribersFile')} />
                            {formState.errors.subscribersFile?.message && <InputError message={String(formState.errors.subscribersFile?.message)} />}
                        </div>

                        <div className="flex items-center gap-4">
                            <Button
                                variant={'ghost'}
                                type="button"
                                className="mt-4 w-full"
                                tabIndex={4}
                                onClick={() => {
                                    Inertia.get(route('email-list.index'));
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
