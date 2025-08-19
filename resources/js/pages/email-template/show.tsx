import { RichTextEditor } from '@/components/rich-text-editor';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { BreadcrumbItem, EmailTemplate } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Pencil } from 'lucide-react';

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
    ] as BreadcrumbItem[];
};

type LaravelPageProps = {
    emailTemplate: EmailTemplate;
};

export default function Show() {
    const { props } = usePage<LaravelPageProps>();
    const { emailTemplate } = props;
    const breadCrumbs = getDinamicBreadcrumbs({ emailTemplateName: emailTemplate.title, emailTemplateId: emailTemplate.id });

    const html = emailTemplate.body || '';

    return (
        <AppLayout breadcrumbs={breadCrumbs}>
            <Head title="Email List" />
            <div className={cn('flex h-full flex-1 flex-col items-center gap-4 overflow-x-auto rounded-xl p-4')}>
                <div className="flex w-full max-w-[700px] flex-col justify-between gap-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-muted-foreground">Email Template: </span>
                            <h1 className="text-2xl font-semibold">{emailTemplate.title}</h1>
                        </div>
                        <Link href={route('email-template.edit', emailTemplate.id)}>
                            <Button variant={'ghost'} size={'icon'}>
                                <Pencil />
                            </Button>
                        </Link>
                    </div>
                    <div className="prose max-w-full rounded-3xl border border-slate-50 px-1 py-4">
                        <RichTextEditor readonly setValue={() => null} value={html} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
