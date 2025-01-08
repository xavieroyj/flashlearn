import { getUserCollections } from "../actions/collection";
import { getRecentActivity, getPinnedCollections } from "../actions/dashboard";
import { getStats } from "../actions/stats";
import CollectionCard from "./collection/components/CollectionCard";
import CreateCollectionDialog from "./collection/components/CreateCollectionDialog";
import RecentActivity from "./components/RecentActivity";
import DashboardStats from "./components/DashboardStats";
import SkeletonStats from "./components/SkeletonStats";
import SkeletonCollections from "./components/SkeletonCollections";
import SkeletonActivity from "./components/SkeletonActivity";
import { revalidatePath } from "next/cache";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Suspense } from "react";

// Separate components for each section to use with Suspense
async function StatsSection() {
    const stats = await getStats();
    return <DashboardStats stats={stats} />;
}

async function PinnedCollectionsSection() {
    const pinnedCollections = await getPinnedCollections();
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg font-medium">Pinned Collections</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 max-h-80 overflow-y-auto">
                    {pinnedCollections.map((collection) => (
                        <CollectionCard
                            key={collection.id}
                            onPinToggle={async () => {
                                'use server';
                                revalidatePath('/dashboard');
                            }}
                            collection={collection}
                        />
                    ))}
                    {pinnedCollections.length === 0 && (
                        <p className="text-sm text-muted-foreground">
                            No pinned collections yet. Pin your favorite collections to access them quickly!
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

async function RecentActivitySection() {
    const recentActivity = await getRecentActivity();
    return <RecentActivity activities={recentActivity} />;
}

export default function Dashboard() {
    return (
        <div className="p-6 space-y-6">
            <Suspense fallback={<SkeletonStats />}>
                <StatsSection />
            </Suspense>

            <div className="grid gap-4 md:grid-cols-2">
                <Suspense fallback={<SkeletonCollections />}>
                    <PinnedCollectionsSection />
                </Suspense>
                <Suspense fallback={<SkeletonActivity />}>
                    <RecentActivitySection />
                </Suspense>
            </div>
        </div>
    );
}