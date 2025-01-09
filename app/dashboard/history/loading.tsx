import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="container mx-auto p-4">
            <div className="mb-6">
                <h1 className="text-3xl font-bold">Activity History</h1>
                <p className="text-muted-foreground">Track your learning journey and past activities</p>
            </div>

            <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                    <Card key={i}>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-4 w-4" />
                                    <Skeleton className="h-6 w-[200px]" />
                                </div>
                                <Skeleton className="h-5 w-[50px]" />
                            </div>
                            <Skeleton className="h-4 w-[120px] mt-2" />
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-8 w-[100px]" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
} 