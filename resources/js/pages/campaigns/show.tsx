import { MetricsTabContent } from '@/components/campaigns/metrics-tab-content';
import { ShowTabList, TabContentLayout } from '@/components/campaigns/show-tab-list';
import { Tabs } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Campaign } from '@/types';
import { Head, usePage } from '@inertiajs/react';

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

export default function Show() {
    const { props } = usePage<LaravelPageProps>();

    const { campaign } = props;

    return (
        <AppLayout breadcrumbs={getDinamicBreadcrumbs({ campaignName: campaign.name, campaignId: campaign.id })}>
            <Head title={campaign.name} />
            <div className="flex h-full w-full justify-center py-10">
                <Tabs defaultValue="metrics" className="w-full max-w-[1000px]">
                    <ShowTabList />
                    <MetricsTabContent />
                    <TabContentLayout tab="open">Open</TabContentLayout>
                    <TabContentLayout tab="clicked">Clicked</TabContentLayout>
                </Tabs>
            </div>
        </AppLayout>
    );
}
