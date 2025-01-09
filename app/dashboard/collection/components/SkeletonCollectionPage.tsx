import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

function SkeletonCollectionCard() {
    return (
        <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-5 w-[160px]" />
                    <Skeleton className="h-4 w-[100px]" />
                </div>
                <Skeleton className="h-8 w-8 rounded-full" />
            </div>
            <div className="space-y-2">
                <div className="flex gap-2">
                    <Skeleton className="h-5 w-[60px]" />
                    <Skeleton className="h-5 w-[40px]" />
                </div>
                <div className="flex gap-2">
                    <Skeleton className="h-8 w-[80px]" />
                    <Skeleton className="h-8 w-[80px]" />
                </div>
            </div>
        </Card>
    );
}

export default function SkeletonCollectionPage() {
    return (
        <div className="w-full h-full p-6 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Your Collections</h1>
                <div className="flex items-center gap-4">
                    <Button disabled>Create Collection</Button>
                </div>
            </div>

            <section>
                <Skeleton className="h-7 w-[120px] mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, i) => (
                        <SkeletonCollectionCard key={i} />
                    ))}
                </div>
            </section>
            
            <section>
                <Skeleton className="h-7 w-[150px] mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <SkeletonCollectionCard key={i} />
                    ))}
                </div>
            </section>
        </div>
    );
} 