import SkeletonStats from "./components/SkeletonStats";
import SkeletonCollections from "./components/SkeletonCollections";
import SkeletonActivity from "./components/SkeletonActivity";

export default function Loading() {
    return (
        <div className="p-6 space-y-6">
            <SkeletonStats />
            
            <div className="grid gap-4 md:grid-cols-2">
                <SkeletonCollections />
                <SkeletonActivity />
            </div>
        </div>
    );
} 