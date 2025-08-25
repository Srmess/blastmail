import { ShowTabList } from '@/components/campaigns/show-tab-list';
import { Tabs } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Campaign } from '@/types';
import { Head, usePage } from '@inertiajs/react';

import { ReactNode } from 'react';

const getDinamicBreadcrumbs = ({ campaignName, campaignId }: { campaignName: string; campaignId: number }) => {
    return [
        {
            title: 'Campaigns',
            href: '/campaigns',
        },
        {
            title: `${campaignName}`,
            href: `/email-template/${campaignId}`,
        },
    ] as BreadcrumbItem[];
};

type LaravelPageProps = {
    campaign: Campaign;
    search: string;
};

export default function CampaignLayout({ children }: { children: ReactNode }) {
    const { props } = usePage<LaravelPageProps>();

    const { campaign } = props;

    const view = window.location.pathname.split('/').at(3);

    return (
        <AppLayout breadcrumbs={getDinamicBreadcrumbs({ campaignName: campaign.name, campaignId: campaign.id })}>
            <Head title={campaign.name} />
            <div className="flex h-full w-full justify-center py-10">
                <Tabs defaultValue="metrics" value={view} className="w-full max-w-[1000px]">
                    <ShowTabList />
                    {children}
                </Tabs>
            </div>
        </AppLayout>
    );
}
