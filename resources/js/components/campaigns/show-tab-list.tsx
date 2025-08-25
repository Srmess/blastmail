import { Campaign } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ReactNode } from 'react';
import { Card } from '../ui/card';
import { TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

type PageProps = {
    campaign: Campaign;
};

export const ShowTabList = () => {
    const { campaign } = usePage<PageProps>().props;
    const campaignId = campaign?.id;

    return (
        <TabsList className="flex w-full max-w-[400px] rounded-md p-0">
            <Link href={route('campaigns.dashboard', [campaignId, 'metrics'])} className="flex h-full flex-1">
                <TabsTrigger
                    value="metrics"
                    className="rounded-none rounded-l-md border-0 border-b-4 data-[state=active]:bg-transparent data-[state=active]:text-primary dark:data-[state=active]:border-white dark:data-[state=active]:bg-transparent dark:data-[state=active]:text-white"
                >
                    Metrics
                </TabsTrigger>
            </Link>
            <Link href={route('campaigns.dashboard', [campaignId, 'open'])} className="flex h-full flex-1">
                <TabsTrigger
                    value="open"
                    className="rounded-none border-0 border-b-4 data-[state=active]:bg-transparent data-[state=active]:text-primary dark:data-[state=active]:border-white dark:data-[state=active]:bg-transparent dark:data-[state=active]:text-white"
                >
                    Open
                </TabsTrigger>
            </Link>
            <Link href={route('campaigns.dashboard', [campaignId, 'clicked'])} className="flex h-full flex-1">
                <TabsTrigger
                    value="clicked"
                    className="rounded-none rounded-r-md border-0 border-b-4 data-[state=active]:bg-transparent data-[state=active]:text-primary dark:data-[state=active]:border-white dark:data-[state=active]:bg-transparent dark:data-[state=active]:text-white"
                >
                    Clicked
                </TabsTrigger>
            </Link>
        </TabsList>
    );
};

export const TabContentLayout = ({ children, tab }: { children: ReactNode; tab: string }) => {
    return (
        <TabsContent value={tab}>
            <Card className="px-6">{children}</Card>
        </TabsContent>
    );
};
