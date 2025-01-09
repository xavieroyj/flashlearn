import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonStats() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
                <Card key={i}>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between space-y-0">
                            <Skeleton className="h-4 w-[100px]" />
                            <Skeleton className="h-4 w-4" />
                        </div>
                        <div className="flex items-center pt-4">
                            <Skeleton className="h-7 w-[60px]" />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
} 