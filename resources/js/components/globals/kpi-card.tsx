import { Card } from '../ui/card';

export const KPICard = ({ metric, title }: { metric: string; title: string }) => {
    return (
        <Card className="flex items-center gap-2.5 border-2">
            <h1 className="font-mono text-5xl font-medium">{metric}</h1>
            <p className="text-xl opacity-80">{title}</p>
        </Card>
    );
};
