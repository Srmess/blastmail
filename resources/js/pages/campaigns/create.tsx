import { FormStepTabs } from '@/components/campaigns/form-step-tabs';
import { BodyForm, ScheduleForm, SetupForm } from '@/components/campaigns/forms';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { ManageCampaignInfer, ManageCampaignSchema } from '@/schemas/campaign';
import { BreadcrumbItem, EmailList, EmailTemplate } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, Link, useForm as inertiaUseForm } from '@inertiajs/react';
import axios from 'axios';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Campaigns',
        href: '/campaigns',
    },
    {
        title: 'Create new Campaigns',
        href: '/campaigns/create',
    },
];

type LaravelPageProps = {
    emailLists: EmailList[];
    emailTemplates: EmailTemplate[];
};

export default function Create({ emailLists, emailTemplates }: LaravelPageProps) {
    const [step, setStep] = useState<'setup' | 'body' | 'schedule'>('setup');
    const [selectedTemplateName, setSelectedTemplateName] = useState('');
    const [emailAmount, setEmailAmount] = useState(0);

    const { post, transform, data } = inertiaUseForm<ManageCampaignInfer>();

    const emailListOptions = emailLists?.map(({ id, title }) => {
        return { label: title, value: `${id}` };
    });

    const emailTemplateOptions = emailTemplates?.map(({ id, title }) => {
        return { label: title, value: `${id}` };
    });

    const form = useForm<ManageCampaignInfer>({
        resolver: zodResolver(ManageCampaignSchema),
        defaultValues: {
            name: '',
            subject: '',
            email_list_id: '',
            email_template_id: '',
            body: '',
            send_at: format(new Date(), 'y-MM-d'),
        },
    });

    const handleClick = async () => {
        if (step === 'setup') {
            const isValidated = await form.trigger(['name', 'subject', 'email_list_id', 'email_template_id']);

            if (!isValidated) {
                return;
            }

            const templateId = form.watch('email_template_id');

            if (templateId) {
                await axios
                    .get(route('email-template.get', templateId))
                    .then((response) => form.reset({ ...form.watch(), body: response.data.body }));
            }

            setStep('body');
            return;
        }

        if (step === 'body') {
            const isValidated = await form.trigger('body');

            if (!isValidated) {
                return;
            }

            const emailListId = form.watch('email_list_id');

            if (emailListId) {
                axios.get(route('email-list.get', emailListId)).then((response) => setEmailAmount(response.data.subscribers_count));
            }

            setStep('schedule');
            return;
        }

        if (step === 'schedule') {
            const isValidated = await form.trigger('send_at');

            if (!isValidated) {
                return;
            }

            transform(() => ({
                ...data,
                ...form.watch(),
            }));

            post(route('campaigns.store'));

            return;
        }
    };

    useEffect(() => {
        const setSelectedTemplateLabel = emailTemplateOptions.find(({ value }) => {
            return value === form.watch('email_template_id');
        })?.label;

        setSelectedTemplateName(setSelectedTemplateLabel || '');
    }, [form.watch('email_template_id')]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create new Campaigns" />
            <div className="flex h-full w-full flex-col items-center py-10">
                <div className="flex w-full max-w-[700px] flex-col justify-center gap-4">
                    <FormStepTabs step={step} />
                    <Card className="w-full p-5">
                        <div className="flex justify-center">
                            <form method="POST" className="flex w-full flex-col gap-6">
                                {step === 'setup' && (
                                    <SetupForm form={form} emailListOptions={emailListOptions} emailTemplateOptions={emailTemplateOptions} />
                                )}
                                {step === 'body' && <BodyForm form={form} />}
                                {step === 'schedule' && <ScheduleForm form={form} emailsAmount={emailAmount} templateName={selectedTemplateName} />}
                            </form>
                        </div>
                        <div className="flex w-full gap-4">
                            {step === 'setup' && (
                                <Link href={route('campaigns.index')} className="w-full">
                                    <Button variant="secondary" className="w-full">
                                        Cancel
                                    </Button>
                                </Link>
                            )}
                            {step !== 'setup' && (
                                <Button
                                    type="button"
                                    variant="secondary"
                                    className="w-full"
                                    onClick={() => {
                                        setStep((step) => (step === 'body' ? 'setup' : 'body'));
                                    }}
                                >
                                    Cancel
                                </Button>
                            )}
                            <Button type="button" onClick={handleClick} className="w-full">
                                submit
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
