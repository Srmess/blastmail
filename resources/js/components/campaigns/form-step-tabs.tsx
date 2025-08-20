import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';

export const FormStepTabs = ({ step }: { step: string }) => {
    return (
        <Tabs defaultValue="Campaign" value={step} className="max-w-[400px]">
            <TabsList className="flex w-full rounded-none p-0">
                <TabsTrigger
                    value="setup"
                    className="rounded-none border-0 border-b-4 hover:cursor-default data-[state=active]:bg-transparent data-[state=active]:text-primary dark:data-[state=active]:border-white dark:data-[state=active]:bg-transparent dark:data-[state=active]:text-white"
                >
                    Setup
                </TabsTrigger>
                <TabsTrigger
                    value="body"
                    className="rounded-none border-0 border-b-4 hover:cursor-default data-[state=active]:bg-transparent data-[state=active]:text-primary dark:data-[state=active]:border-white dark:data-[state=active]:bg-transparent dark:data-[state=active]:text-white"
                >
                    body
                </TabsTrigger>
                <TabsTrigger
                    value="schedule"
                    className="rounded-none border-0 border-b-4 hover:cursor-default data-[state=active]:bg-transparent data-[state=active]:text-primary dark:data-[state=active]:border-white dark:data-[state=active]:bg-transparent dark:data-[state=active]:text-white"
                >
                    schedule
                </TabsTrigger>
            </TabsList>
        </Tabs>
    );
};
