import { CampaignMetrics } from '@/types';
import { usePage } from '@inertiajs/react';
import { KPICard } from '../../globals/kpi-card';
import { TabContentLayout } from '../show-tab-list';

export const MetricsTabContent = () => {
    const { props } = usePage<{ query: CampaignMetrics }>();

    return (
        <TabContentLayout tab="metrics">
            <div className="grid grid-cols-3 gap-5">
                <KPICard metric={`${props.query.total_openings}`} title="Opens" />
                <KPICard metric={`${props.query.unique_openings}`} title="Unique Opens" />
                <KPICard metric={`${props.query.unique_openings_rate}%`} title="Open Rate" />
                <KPICard metric={`${props.query.total_clicks}`} title="Clicks" />
                <KPICard metric={`${props.query.unique_clicks}`} title="Unique Clicks" />
                <KPICard metric={`${props.query.unique_clicks_rate}%`} title="Clicks Rate" />
            </div>
        </TabContentLayout>
    );
};
