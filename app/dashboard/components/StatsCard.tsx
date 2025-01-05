import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    className?: string;
}

export default function StatsCard({ title, value, icon, className }: StatsCardProps) {
    return (
        <Card className={cn("", className)}>
            <CardContent className="p-6">
                <div className="flex items-center justify-between space-y-0">
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    <div className="text-muted-foreground">{icon}</div>
                </div>
                <div className="flex items-center pt-4">
                    <div className="text-2xl font-bold">{value}</div>
                </div>
            </CardContent>
        </Card>
    );
}
