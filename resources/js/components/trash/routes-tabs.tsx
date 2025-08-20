import { Link } from '@inertiajs/react';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';

export const RoutesTabs = () => {
    return (
        <div className="flex w-full items-center justify-center">
            <Tabs defaultValue="Campaign" value={route().current()?.split('.')[1] || 'campaigns'} className="w-full max-w-[600px]">
                <TabsList className="flex w-full p-0">
                    <Link href={route('trash.campaigns')} className="flex h-full flex-1">
                        <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
                    </Link>
                    <Link href={route('trash.email-lists')} className="flex h-full flex-1">
                        <TabsTrigger value="email-lists">Email Lists</TabsTrigger>
                    </Link>
                    <Link href={route('trash.email-templates')} className="flex h-full flex-1">
                        <TabsTrigger value="email-templates">Email Templates</TabsTrigger>
                    </Link>
                </TabsList>
            </Tabs>
        </div>
    );
};
