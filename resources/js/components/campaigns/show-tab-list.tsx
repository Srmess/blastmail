import { ReactNode } from 'react';
import { Card } from '../ui/card';
import { TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export const ShowTabList = () => {
    return (
        <TabsList className="flex w-full max-w-[400px] rounded-md p-0">
            <TabsTrigger
                value="metrics"
                className="rounded-none rounded-l-md border-0 border-b-4 data-[state=active]:bg-transparent data-[state=active]:text-primary dark:data-[state=active]:border-white dark:data-[state=active]:bg-transparent dark:data-[state=active]:text-white"
            >
                Metrics
            </TabsTrigger>
            <TabsTrigger
                value="open"
                className="rounded-none border-0 border-b-4 data-[state=active]:bg-transparent data-[state=active]:text-primary dark:data-[state=active]:border-white dark:data-[state=active]:bg-transparent dark:data-[state=active]:text-white"
            >
                Open
            </TabsTrigger>
            <TabsTrigger
                value="clicked"
                className="rounded-none rounded-r-md border-0 border-b-4 data-[state=active]:bg-transparent data-[state=active]:text-primary dark:data-[state=active]:border-white dark:data-[state=active]:bg-transparent dark:data-[state=active]:text-white"
            >
                Clicked
            </TabsTrigger>
        </TabsList>
    );
};

export const TabContentLayout = ({ children, tab }: { children: ReactNode; tab: string }) => {
    return (
        <TabsContent value={tab}>
            <Card className="bg-muted px-6">{children}</Card>
        </TabsContent>
    );
};
