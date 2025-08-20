import { RoutesTabs } from '@/components/trash/routes-tabs';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';
import AppLayout from '../app-layout';

type TrashPaths = 'campaigns' | 'email-list' | 'email-templates';

const getDinamicBreadcrumbs = ({ pathName }: { pathName: TrashPaths }) => {
    if (pathName === 'campaigns') {
        return [
            {
                title: 'Trash',
                href: '/trash',
            },
            {
                title: 'Campaigns',
                href: '/trash/campaigns',
            },
        ] as BreadcrumbItem[];
    }

    return [
        {
            title: 'Trash',
            href: '/trash',
        },
        {
            title: `${
                pathName.charAt(0).toUpperCase() +
                pathName.split('-')[0].slice(1) +
                ' ' +
                pathName.split('-')[1].charAt(0).toUpperCase() +
                pathName.split('-')[1].slice(1)
            }`,
            href: `/email-template/${pathName}`,
        },
    ] as BreadcrumbItem[];
};

export const TrashLayout = ({ children }: { children: ReactNode }) => {
    const breadCrumbs = getDinamicBreadcrumbs({ pathName: route().current()?.split('.')[1] as TrashPaths });

    return (
        <AppLayout breadcrumbs={breadCrumbs}>
            <Head title="Campaigns" />
            <div className="flex flex-1 flex-col p-4">
                <RoutesTabs />
                {children}
            </div>
        </AppLayout>
    );
};
