import { FormStepTabs } from '@/components/campaigns/form-step-tabs';
import { BodyForm, ScheduleForm, SetupForm } from '@/components/campaigns/forms';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { ManageCampaignInfer, ManageCampaignSchema } from '@/schemas/campaign';
import { BreadcrumbItem } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, Link, useForm as inertiaUseForm } from '@inertiajs/react';
import { useState } from 'react';
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

export default function Create() {
    const [step, setStep] = useState<'setup' | 'body' | 'schedule'>('setup');

    const { post, transform, data } = inertiaUseForm<ManageCampaignInfer>();

    const form = useForm<ManageCampaignInfer>({
        resolver: zodResolver(ManageCampaignSchema),
        mode: 'onSubmit',
        defaultValues: {
            name: '',
            subject: '',
            email_list_id: '',
            email_template_id: '',
            body: '',
        },
    });

    const handleClick = async () => {
        if (step === 'setup') {
            const isValidated = await form.trigger(['name', 'subject', 'email_list_id', 'email_template_id']);

            if (!isValidated) {
                return;
            }

            setStep('body');
            return;
        }

        if (step === 'body') {
            const isValidated = await form.trigger('body');

            if (!isValidated) {
                return;
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create new Campaigns" />
            <div className="flex h-full w-full flex-col items-center py-10">
                <div className="flex w-full max-w-[700px] flex-col justify-center gap-4">
                    <FormStepTabs step={step} />
                    <Card className="w-full p-5">
                        <div className="flex justify-center">
                            <form method="POST" className="flex w-full flex-col gap-6">
                                {step === 'setup' && <SetupForm form={form} />}
                                {step === 'body' && <BodyForm form={form} />}
                                {step === 'schedule' && <ScheduleForm form={form} />}
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
                                    onClick={() => setStep((step) => (step === 'body' ? 'setup' : 'body'))}
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
