import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="w-full h-full p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <Skeleton className="h-8 w-64" />
                    <Skeleton className="h-4 w-48 mt-2" />
                </div>
            </div>

            <div className="flex justify-center">
                <Skeleton className="h-10 w-full max-w-md" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <Card key={i} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <Skeleton className="h-6 w-full" />
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {[1, 2, 3, 4].map((j) => (
                                    <Skeleton key={j} className="h-12 w-full" />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
