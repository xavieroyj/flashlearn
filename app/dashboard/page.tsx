import { getRecentActivity, getPinnedCollections } from "../actions/dashboard";
import { getStats } from "../actions/stats";
import RecentActivity from "./components/RecentActivity";
import DashboardStats from "./components/DashboardStats";
import SkeletonStats from "./components/SkeletonStats";
import SkeletonCollections from "./components/SkeletonCollections";
import SkeletonActivity from "./components/SkeletonActivity";
import { revalidatePath } from "next/cache";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Suspense } from "react";
import CollectionCard from "@/components/CollectionCard";

// Separate components for each section to use with Suspense
async function StatsSection() {
    const stats = await getStats();
    return <DashboardStats stats={stats} />;
}

async function PinnedCollectionsSection() {
    const pinnedCollections = await getPinnedCollections();

    async function handleAction() {
        'use server';
        revalidatePath('/dashboard');
    }

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
                            collection={collection}
                            isOwner={true}
                            inDashboard={true}
                            onAction={handleAction}
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
        <div className="space-y-6">
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
