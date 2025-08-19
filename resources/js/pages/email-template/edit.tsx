import InputError from '@/components/input-error';
import { RichTextEditor } from '@/components/rich-text-editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { ManageEmailTemplateInfer } from '@/schemas/email-template';
import { BreadcrumbItem, EmailTemplate } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

const getDinamicBreadcrumbs = ({ emailTemplateName, emailTemplateId }: { emailTemplateName: string; emailTemplateId: number }) => {
    return [
        {
            title: 'Templates',
            href: '/email-template',
        },
        {
            title: `${emailTemplateName}`,
            href: `/email-template/${emailTemplateId}`,
        },
        {
            title: `Edit Email Template`,
            href: `/email-template/${emailTemplateId}/edit`,
        },
    ] as BreadcrumbItem[];
};

type LaravelPageProps = {
    emailTemplate: EmailTemplate;
};

export default function Edit() {
    const { props } = usePage<LaravelPageProps>();
    const { emailTemplate } = props;

    const breadCrumbs = getDinamicBreadcrumbs({ emailTemplateName: emailTemplate.title, emailTemplateId: emailTemplate.id });

    const { put, errors, setData, data, reset, processing } = useForm<ManageEmailTemplateInfer>({
        title: emailTemplate?.title || '',
        body: emailTemplate?.body || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('email-template.update', emailTemplate.id), {
            onSuccess: () => {
                toast.success('Template updated successfully!');
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
                        <div className="grid h-full gap-2">
                            <Label htmlFor="body">body</Label>
                            <RichTextEditor setValue={(val) => setData('body', val)} value={data.body} />
                            <InputError message={errors.body} />
                        </div>

                        <div className="flex items-center gap-4">
                            <Link href={route('email-template.index')} className="w-full">
                                <Button variant={'ghost'} type="button" className="w-full">
                                    Cancel
                                </Button>
                            </Link>
                            <Button type="submit" className="w-full">
                                Salvar
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
