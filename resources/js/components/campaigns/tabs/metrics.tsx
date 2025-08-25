import { KPICard } from '../../globals/kpi-card';
import { TabContentLayout } from '../show-tab-list';

export const MetricsTabContent = () => {
    return (
        <TabContentLayout tab="metrics">
            <div className="grid grid-cols-3 gap-5">
                <KPICard metric={'01'} title="Opens" />
                <KPICard metric={'02'} title="Unique Opens" />
                <KPICard metric={'20%'} title="Open Rate" />
                <KPICard metric={'0'} title="Clicks" />
                <KPICard metric={'0'} title="Unique Clicks" />
                <KPICard metric={'20%'} title="Clicks Rate" />
            </div>
        </TabContentLayout>
    );
};
