import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="w-full h-full p-6 space-y-8">
            <div className="space-y-4">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-48" />
            </div>

            <div className="space-y-6">
                <div className="space-y-4">
                    <Skeleton className="h-6 w-full max-w-2xl" />
                    <div className="grid grid-cols-1 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <Skeleton key={i} className="h-16 w-full" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
