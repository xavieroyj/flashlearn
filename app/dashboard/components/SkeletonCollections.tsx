import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCollections() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg font-medium">Pinned Collections</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 max-h-80 overflow-y-auto">
                    {[...Array(3)].map((_, i) => (
                        <Card key={i} className="p-4">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <Skeleton className="h-4 w-[140px]" />
                                    <Skeleton className="h-4 w-4" />
                                </div>
                                <div className="flex gap-2">
                                    <Skeleton className="h-4 w-[60px]" />
                                    <Skeleton className="h-4 w-[40px]" />
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
} 