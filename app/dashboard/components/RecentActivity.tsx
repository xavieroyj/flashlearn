import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDistanceToNow } from "date-fns";

interface RecentActivityProps {
    activities: Array<{
        id: number;
        score: number;
        totalQuestions: number;
        createdAt: Date;
        collection: {
            name: string;
        };
    }>;
}

export default function RecentActivity({ activities }: RecentActivityProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4 max-h-80 overflow-y-auto">
                    {activities.map((activity) => (
                        <div key={activity.id} className="flex items-center">
                            <div className="ml-4 space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    {activity.collection.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Score: {activity.score}/{activity.totalQuestions} ({Math.round((activity.score / activity.totalQuestions) * 100)}%)
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
